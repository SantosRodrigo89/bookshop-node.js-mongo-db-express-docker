import mongoose from "mongoose";

async function databaseConnect() {
  try {
    await mongoose.connect("mongodb+srv://admin:admin123@cluster0.xvqppbu.mongodb.net/livraria?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Conectado ao MongoDB com sucesso!");
    return mongoose.connection;
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    throw error;
  }
}

export default databaseConnect;
