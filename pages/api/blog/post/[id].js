import posts from '../posts.json'

export default function handler(req, res) {
    const {id} = req.query
    posts.forEach((Obj, index) => {
        if(Obj.id == id) {
            res.status(200).json(Obj)
            return 
            
        }
        else if(index === posts.length) {
            res.status(400).json({err: `${posts}`})
            return
        }
    })
}
  