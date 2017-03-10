const library = require("../app/js/GeOO.js");
const GeOO = library.GeOO();
describe("Line", () => {

    let point01 = GeOO.newPoint2D(1, 11);
    let point02 = GeOO.newPoint2D(2, 22);

    let line01 = GeOO.newLine2D(point01, point02);
    it("API should return a Line-Instance for correct arguments", () => {
        expect(line01.constructor.toString()).toEqual(Line2D.toString());
    });

    it("should throw an error if the first argument is not a instance of Point2D", () => {
        expect(() => {
            GeOO.newLine2D(11, point01);
        }).toThrow(new TypeError("Given value -> 11 <- is not a Point2D."));
    });

    it("should throw an error if the second argument is not a instance of Point2D", () => {
        expect(() => {
            GeOO.newLine2D(point01, 32);
        }).toThrow(new TypeError("Given value -> 32 <- is not a Point2D."));
    });

    it("distance for equal start- and endpoint should be 0", () => {
        const PennsylvaniaAveNW = GeOO.newPoint2D(38.898556, -77.037852);
        const line = GeOO.newLine2D(PennsylvaniaAveNW, PennsylvaniaAveNW);
        expect(line.getGreatCircleLength_inMeter_ForLatitudeLongitude_PointValues()).toEqual(0);
    });
    
    it("should return the expected distance for two valid Points", () => {
        // Distance from http://andrew.hedges.name/experiments/haversine/
        const PennsylvaniaAveNW = GeOO.newPoint2D(38.898556, -77.037852);
        const FStNW = GeOO.newPoint2D(38.897147, -77.043934);
        const line = GeOO.newLine2D(PennsylvaniaAveNW, FStNW);
        expect(line.getGreatCircleLength_inMeter_ForLatitudeLongitude_PointValues()).toEqual(549);
    });
});




// This function is a duplication from the ione in GeOO, so it can be tested here.
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