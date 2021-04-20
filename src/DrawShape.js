import { types } from "mobx-state-tree";

const DrawShape= types
    .model({
        shapename: types.optional(types.string, ""),
        basicshape: types.optional(types.string, ""),
        dimA: types.optional(types.integer, 0),
        dimB: types.optional(types.integer, 0),
        dimC: types.optional(types.integer, 0),
        dimD: types.optional(types.integer, 0),
        dimE: types.optional(types.integer, 0),
        dimF: types.optional(types.integer, 0),
        dimAngleA: types.optional(types.integer, 0),
        dimAngleB: types.optional(types.integer, 0),        
        isValid: types.optional(types.boolean, true),
        indexnum:types.optional(types.integer, 0)
    })
    .actions(self => ({
        setName(newName) {
            self.shapename = newName
        },
        setBasicShape(shapename) {
            self.basicshape = shapename
        },
        setDimA(newDimA) {
            self.dimA = newDimA
        },
        setDimB(newDimB) {
            self.dimB = newDimB
        },
        setDimC(newDimC) {
            self.dimC = newDimC
        },
        setDimD(newDimD) {
            self.dimD = newDimD
        },
        setDimE(newDimE) {
            self.dimE = newDimE
        },
        setDimF(newDimF) {
            self.dimF = newDimF
        },
        setAngleA(newAngle) {
            self.dimAngleA = newAngle
        },
        setAngleB(newAngle) {
            self.dimAngleB = newAngle
        },
        setAngleC(newAngle) {
            self.dimAngleC = newAngle
        },
        setAngleD(newAngle) {
            self.dimAngleD = newAngle
        },
        toggleValid() {
            self.isValid = !self.isValid
        },
        setIndexNum(indexnum) {
            self.indexnum = indexnum
        }
    }))

export default DrawShape;