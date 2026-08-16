//import database.js
import db from "./database.js";

//buat funtion transaction
const transaction = async () => {
     //buat connection yang mengambil koneksi dari database
    const connection = await db.getConnection();

    //kita gunakan try cath agar jika terdapat error atau disconnect, connection akan kembali ke poll
    try{
        //lakukan transaksi
        await connection.beginTransaction();
        return connection;
    }catch(err){
        connection.release();
        throw err;
    }
}

//buat function commit
const commit = async (conn) => {

    await conn.commit();
    //jangan memanggil release() disini karena dipanggil di service
}


//buat function rollback
const rollback = async (conn) => {
        
    await conn.rollback();
    //jangan memanggil release() disini, karena dipanggil di service, dan pemanggilan sekali saja
}

export default {
    transaction,
    commit,
    rollback,
}