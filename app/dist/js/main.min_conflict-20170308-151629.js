const GeOO = (() => {
    /**
     * Geometries
     */
    function Point2D() {
        let horizontalValue;
        let verticalValue;
        let coordinateReferenceSystem;


        this.setHorizontalValue = function (newHorizontalValue) {
            if (newValueIsNumber(newHorizontalValue)) {
                horizontalValue = newHorizontalValue;
            } else {
                throw new TypeError("Given value -> " + newHorizontalValue + " <- is not a number.");
            }
        };

        this.getHorizontalValue = function () {
            return horizontalValue;
        };


        this.setVerticalValue = function (newVerticalValue) {
            if (newValueIsNumber(newVerticalValue)) {
                verticalValue = newVerticalValue;
            } else {
                throw new TypeError("Given value -> " + newVerticalValue + " <- is not a number.");
            }
        };
        
        this.getVerticalValue = function () {
            return verticalValue;
        };


        this.setCoordinateReferenceSystem = function (newCoordinateReferenceSystem) {
            coordinateReferenceSystem = newCoordinateReferenceSystem;
        };
        
        this.getCoordinateReferenceSystem = function () {
            return coordinateReferenceSystem;
        };
    }


    /*
     * General helping Functions
     */

    function newValueIsNumber(newValue) {
        if (typeof newValue === "number") {
            return true;
        } else {
            return false;
        }
    }


    /**
     * Interface
     */

    return {
        newPoint2D: function(horizontalValue, verticalValue, coordinateReferenceSystem) {
            try {
                return instanciatePoint(horizontalValue, verticalValue, coordinateReferenceSystem);
            } catch (error) {
                throw error;
            }
        }
    };

    /*
     * Instanciate objects
     */
    function instanciatePoint(horizontalValue, verticalValue, coordinateReferenceSystem) {
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

});


module.exports = {
    GeOO: GeOO
};