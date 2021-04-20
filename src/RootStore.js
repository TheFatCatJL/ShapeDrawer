import DrawShape from './DrawShape';
import { types } from 'mobx-state-tree'

const RootStore = types
  .model({
    projectname: types.optional(types.string, ""),
    drawShapes: types.map(DrawShape)
  })
  .actions(self => ({
    addDrawShape(id, name) {
      self.drawShapes.set(id, DrawShape.create({ shapename:name }));
    },
    getDrawShape(keyid){        
        return self.drawShapes.get(keyid)
    },
    setProjectname(name){  
      self.projectname=name
    },
    getProjectname(){  
      return self.projectname
    },
    mapModel(model){
      self.projectname = model.projectname
      self.drawShapes = model.drawShapes
    }
  }))

export default RootStore;