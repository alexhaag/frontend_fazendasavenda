import { db } from '../services/firebase';

const selectAreas = async (req, res) => {
  const data = []
  const dbRef = db.collection("imoveis").where("tipo", "==", "Fazenda");
  await dbRef.get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const resultado = doc.data();
        resultado.id = doc.id;
        data.push(resultado)
      })
      return res.status(200).json(data)
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}

export default selectAreas;