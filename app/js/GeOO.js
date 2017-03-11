const GeOO = (() => {
    function Point2D() {
        let horizontalValue;
        let verticalValue;
        let coordinateReferenceSystem;


        this.setHorizontalValue = newHorizontalValue => {
            if (newValueIsNumber(newHorizontalValue)) {
                horizontalValue = newHorizontalValue;
            } else {
                throw new TypeError("Given value -> " + newHorizontalValue + " <- is not a number.");
            }
        };

        this.getHorizontalValue = () => {
            return horizontalValue;
        };


        this.setVerticalValue = newVerticalValue => {
            if (newValueIsNumber(newVerticalValue)) {
                verticalValue = newVerticalValue;
            } else {
                throw new TypeError("Given value -> " + newVerticalValue + " <- is not a number.");
            }
        };

        this.getVerticalValue = () => {
            return verticalValue;
        };


        this.setCoordinateReferenceSystem = newCoordinateReferenceSystem => {
            coordinateReferenceSystem = newCoordinateReferenceSystem;
        };

        this.getCoordinateReferenceSystem = () => {
            return coordinateReferenceSystem;
        };
    }
//*************************************************************************************************************************
    function Line2D() {
        let startPoint;
        let endPoint;


        this.setStart = newStartPoint => {
            if (isPoint2D(newStartPoint)) {
                startPoint = newStartPoint;
            } else {
                throw new TypeError("Given value -> " + newStartPoint + " <- is not a Point2D.");
            }
        };

        this.getStart = () => {
            return startPoint;
        };


        this.setEnd = newEndPoint => {
            if (isPoint2D(newEndPoint)) {
                endPoint = newEndPoint;
            } else {
                throw new TypeError("Given value -> " + newEndPoint + " <- is not a Point2D.");
            }
        };

        this.getEnd = () => {
            return endPoint;
        };


        this.getGreatCircleLength_inMeter_ForLatitudeLongitude_PointValues = () => {
            const startPointHorizontalValue = degrees2radians(startPoint.getHorizontalValue());
            const endPointHorizontalValue = degrees2radians(endPoint.getHorizontalValue());
            const differenceHorizontalValuesEndStart = degrees2radians(endPoint.getHorizontalValue() - startPoint.getHorizontalValue());
            const differenceVerticalValuesEndStart = degrees2radians(endPoint.getVerticalValue() - startPoint.getVerticalValue());

            return calculateMeterDistanceForPointsWithRadianValues(startPointHorizontalValue, endPointHorizontalValue, differenceHorizontalValuesEndStart, differenceVerticalValuesEndStart);
        };
    }
//*************************************************************************************************************************
    function Polyline2D() {
        let linesegments = [];

        this.isEmpty = () => {
            return linesegments.length <= 0;
        };

        this.getSegmentAtPosition = position => {
            if (validPositionInArray(position, linesegments)) {
                return linesegments[position];
            } else {
                throw new RangeError("Requested position is not an index for a segment. Valid indexes are currently integers from the interval [0,+" + linesegments.length - 1 + "].");
            }
        };

        this.getNumberOfSegments = () => {
            return linesegments.length;
        };

        this.reset = () => {
            linesegments = [];
        };

        this.addLinesegmentToEnd = line2DSegment => {
            if (isLine2D(line2DSegment)) {
                linesegments.push(line2DSegment);
            } else {
                throw new TypeError("Given value -> " + line2DSegment + " <- is not a Line2D.");
            }
        };


        this.getGreatCircleLength_inMeter_ForLatitudeLongitude_PointValues = () => {
            return linesegments.reduce((sumOfLength, lineLength) => sumOfLength + lineLength.getGreatCircleLength_inMeter_ForLatitudeLongitude_PointValues(), 0);
        };
    }

    //*************************************************************************************************************************

    /*
     * Assertions
     */

    function newValueIsNumber(newValue) {
        return (typeof newValue === "number");
    }

    function isPoint2D(newElement) {
        return newElement instanceof Point2D;
    }

    function validPositionInArray(position, array) {
        return -1 < position && position < array.length;
    }

    function isLine2D(newElement) {
        return newElement instanceof Line2D;
    }




    /*
     * Calculate length of line
     */
    function degrees2radians(degrees) {
        const pi = Math.PI;
        return degrees * (pi / 180);
    }

    function calculateMeterDistanceForPointsWithRadianValues(startPointHorizontalValue, endPointHorizontalValue, differenceHorizontalValuesEndStart, differenceVerticalValuesEndStart) {
        // Formular for small distances, taken from http://www.movable-type.co.uk/scripts/latlong.html and http://andrew.hedges.name/experiments/haversine/
        const EarthRadiusInMeters = 6371000;
        try {
            const a = squareOfHalfTheChordLengthBetweenThePoints(startPointHorizontalValue, endPointHorizontalValue, differenceHorizontalValuesEndStart, differenceVerticalValuesEndStart);
            const b = angularDistanceInRadians(a);
            const distanceInMeter = b * EarthRadiusInMeters;
            return Math.round(distanceInMeter, -1); // Rounding to km with two decimalplaces.   
        } catch (error) {
            throw error;
        }
    }

    function squareOfHalfTheChordLengthBetweenThePoints(startPointHorizontalValue, endPointHorizontalValue, differenceHorizontalValuesEndStart, differenceVerticalValuesEndStart) {
        try {
            return Math.pow(Math.sin(differenceHorizontalValuesEndStart / 2), 2) + Math.cos(startPointHorizontalValue) * Math.cos(endPointHorizontalValue) * Math.pow(Math.sin(differenceVerticalValuesEndStart / 2), 2);
        } catch (error) {
            throw error;
        }
    }

    function angularDistanceInRadians(squareOfHalfTheChordLengthBetweenThePoints) {
        try {
            return 2 * Math.atan2(Math.sqrt(squareOfHalfTheChordLengthBetweenThePoints), Math.sqrt(1 - squareOfHalfTheChordLengthBetweenThePoints));
        } catch (error) {
            throw error;
        }
    }

    /**
     * Interface
     */

    return {
        newPoint2D: (horizontalValue, verticalValue, coordinateReferenceSystem) => {
            try {
                return instanciatePoint2D(horizontalValue, verticalValue, coordinateReferenceSystem);
            } catch (error) {
                throw error;
            }
        },

        newLine2D: (start, end) => {
            try {
                return instanciateLine2D(start, end);
            } catch (error) {
                throw error;
            }
        },

        newPolyline2D: (...lines2D) => {
            try {
                // If first argument is an Array. Only this onle with its content will be processed. Otherwisw all commaseperated arguments.
                let result = lines2D[0] instanceof Array ? instanciatePolyline2DwithArray(lines2D[0]) : instanciatePolyline2DwithArray(lines2D);
                return result;
            } catch (error) {
                throw error;
            }

        }
    };

    /*
     * Instanciate objects
     */
    function instanciatePoint2D(horizontalValue, verticalValue, coordinateReferenceSystem) {
        try {
            let point = new Point2D();
            point.setHorizontalValue(horizontalValue);
            point.setVerticalValue(verticalValue);
            point.setCoordinateReferenceSystem(coordinateReferenceSystem);
            return point;
        } catch (error) {
            throw error;
        }
    }

    function instanciateLine2D(start, end) {
        try {
            let line = new Line2D();
            line.setStart(start);
            line.setEnd(end);
            return line;
        } catch (error) {
            throw error;
        }
    }

    function instanciatePolyline2DwithArray(lines2D) {
        try {
            let polyline = new Polyline2D();
            lines2D.forEach(line => {
                polyline.addLinesegmentToEnd(line);
            });
            return polyline;
        } catch (error) {
            throw error;
        }

    }

});


module.exports = {
    GeOO: GeOO
};