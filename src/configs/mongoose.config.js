import mongoose from 'mongoose';

class Database{
    async Connect(connectionString)
    {
        if(!connectionString)
        {
            throw new Error('Connection string is required');
        }
        try{
            mongoose.set('debug', true);
            mongoose.set('debug', { color: true });
            await mongoose.connect(connectionString);
            console.log('MongoDB connected');
        }
        catch(err)
        {
            console.error('MongoDB connection error:', err);
        }
    }
    static getInstance()
    {
        if(!Database.instance)
        {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

const db = Database.getInstance();
export default db;