const library = require("../app/js/GeOO.js");
const GeOO = library.GeOO();
describe("Polyline", () => {

    let point01 = GeOO.newPoint2D(51.964711, 7.628496);
    let point02 = GeOO.newPoint2D(51.965711, 7.698496);

    let point11 = GeOO.newPoint2D(51.965711, 7.698496);
    let point22 = GeOO.newPoint2D(51.865711, 7.598496);

    let line01 = GeOO.newLine2D(point01, point02);
    let line02 = GeOO.newLine2D(point11, point22);

    it("API should return a valid Line-Instance using one simple Line-Element to instanciate the polyline", () => {
        let polyline01 = GeOO.newPolyline2D(line01);
        expect(polyline01.constructor.toString()).toEqual(Polyline2D.toString());
        expect(polyline01.isEmpty()).toEqual(false);
        expect(polyline01.getNumberOfSegments()).toBe(1);
        expect(polyline01.getSegmentAtPosition(0)).toBe(line01);
        expect(polyline01.getGreatCircleLength_inMeter_ForLatitudeLongitude_PointValues()).toEqual(4797);

        let polyline02 = GeOO.newPolyline2D(line02);
        expect(polyline02.getGreatCircleLength_inMeter_ForLatitudeLongitude_PointValues()).toEqual(13065);

        polyline01.addLinesegmentToEnd(line02);
        expect(polyline01.getNumberOfSegments()).toBe(2);
        expect(polyline01.getSegmentAtPosition(0)).toBe(line01);
        expect(polyline01.getSegmentAtPosition(1)).toBe(line02);
        expect(polyline01.getGreatCircleLength_inMeter_ForLatitudeLongitude_PointValues()).toEqual(4797 + 13065);

        let notconnectedPolyline = polyline01.addLinesegmentToEnd(line01);
        expect(polyline01.getGreatCircleLength_inMeter_ForLatitudeLongitude_PointValues()).toEqual(22659);

        polyline01.reset();
        expect(polyline01.getGreatCircleLength_inMeter_ForLatitudeLongitude_PointValues()).toEqual(0);

    });
    it("API should return a valid Line-Instance using an Array with one element to instanciate the polyline", () => {
        let polyline01 = GeOO.newPolyline2D([line01]);
        expect(polyline01.constructor.toString()).toEqual(Polyline2D.toString());
        expect(polyline01.isEmpty()).toEqual(false);
        expect(polyline01.getNumberOfSegments()).toBe(1);
        expect(polyline01.getSegmentAtPosition(0)).toBe(line01);
        expect(polyline01.getGreatCircleLength_inMeter_ForLatitudeLongitude_PointValues()).toEqual(4797);

        let polyline02 = GeOO.newPolyline2D(line02);
        expect(polyline02.getGreatCircleLength_inMeter_ForLatitudeLongitude_PointValues()).toEqual(13065);

        polyline01.addLinesegmentToEnd(line02);
        expect(polyline01.getNumberOfSegments()).toBe(2);
        expect(polyline01.getSegmentAtPosition(0)).toBe(line01);
        expect(polyline01.getSegmentAtPosition(1)).toBe(line02);
        expect(polyline01.getGreatCircleLength_inMeter_ForLatitudeLongitude_PointValues()).toEqual(4797 + 13065);

        let notconnectedPolyline = polyline01.addLinesegmentToEnd(line01);
        expect(polyline01.getGreatCircleLength_inMeter_ForLatitudeLongitude_PointValues()).toEqual(22659);

        polyline01.reset();
        expect(polyline01.getGreatCircleLength_inMeter_ForLatitudeLongitude_PointValues()).toEqual(0);
    });

    it("API should return a valid Line-Instance using an Array with two elements to instanciate the polyline", () => {
        let polyline01 = GeOO.newPolyline2D([line01, line02]);
        expect(polyline01.constructor.toString()).toEqual(Polyline2D.toString());
        expect(polyline01.isEmpty()).toEqual(false);
        expect(polyline01.getNumberOfSegments()).toBe(2);
        expect(polyline01.getSegmentAtPosition(0)).toBe(line01);
        expect(polyline01.getSegmentAtPosition(1)).toBe(line02);
        expect(polyline01.getGreatCircleLength_inMeter_ForLatitudeLongitude_PointValues()).toEqual(4797 + 13065);

        polyline01.reset();
        expect(polyline01.getGreatCircleLength_inMeter_ForLatitudeLongitude_PointValues()).toEqual(0);
    });
});




// This function is a duplication from the ione in GeOO, so it can be tested here.
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