const library = require("../app/js/GeOO.js");
const GeOO = library.GeOO();
describe("Point", () => {

    let point01 = GeOO.newPoint2D(1, 11);
    it("should have 1 as horizontal value initially given", () => {
        expect(point01.getHorizontalValue()).toBe(1);
    });
    it("should have 11 as vertical value initially given", () => {
        expect(point01.getVerticalValue()).toBe(11);
    });

    let point02 = GeOO.newPoint2D(2, 22);
    it("should have 2 as horizontal value initially given", () => {
        expect(point02.getHorizontalValue()).toBe(2);
    });
    it("should have 22 as vertical value initially given", () => {
        expect(point02.getVerticalValue()).toBe(22);
    });

    it("should have independent instances", () => {
        expect(point01.getHorizontalValue()).toBe(1);
        expect(point01.getVerticalValue()).toBe(11);

        // Do a reasignment of values have sideaffects?
        point02.setHorizontalValue(22);
        point02.setVerticalValue(222);

        expect(point01.getHorizontalValue()).toBe(1);
        expect(point01.getVerticalValue()).toBe(11);

        // Do a reasignment of values have sideaffects?
        point01.setHorizontalValue(11);
        point01.setVerticalValue(111);

        expect(point01.getHorizontalValue()).toBe(11);
        expect(point01.getVerticalValue()).toBe(111);

        expect(point02.getHorizontalValue()).toBe(22);
        expect(point02.getVerticalValue()).toBe(222);
    });

    it("should have private properties", () => {
        expect(point02.horizontalValue).toEqual(undefined);
        expect(point02.verticalValue).toEqual(undefined);
    });

    it("should throw an error if the client tries to set anything else than a number", () => {
        expect(() => {
            point01.setHorizontalValue(true)
        }).toThrow(new TypeError("Given value -> true <- is not a number."));
        expect(() => {
            point01.setHorizontalValue(false)
        }).toThrow(new TypeError("Given value -> false <- is not a number."));
        expect(() => {
            point01.setVerticalValue(true)
        }).toThrow(new TypeError("Given value -> true <- is not a number."));
        expect(() => {
            point01.setVerticalValue(false)
        }).toThrow(new TypeError("Given value -> false <- is not a number."));

        expect(() => {
            point01.setHorizontalValue("test")
        }).toThrow(new TypeError("Given value -> test <- is not a number."));
        expect(() => {
            point01.setVerticalValue("test")
        }).toThrow(new TypeError("Given value -> test <- is not a number."));
    });

});