import {HandleRefresh} from "@/api/auth";

describe("HandleRefresh", () => {
    it("should be singleton", () => {
        const instance1 = HandleRefresh.getInstance()
        const instance2 = HandleRefresh.getInstance()
        expect(instance1).toBe(instance2)
    })

    it("should start interval", () => {
        const instance = HandleRefresh.getInstance()
        instance.start()
        expect(instance).toBeDefined()
    })

    it("should stop interval", () => {
        const instance = HandleRefresh.getInstance()
        instance.start()
        instance.stop()
        expect(instance).toBeDefined()
        expect(instance.getInterval()).toBeNull()
    })
})