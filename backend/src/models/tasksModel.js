const connection = require('./connection');

const getAll = async () => {
    const query = 'SELECT * FROM tasks';
    const [tasks] = await connection.execute(query);
    return tasks;
};

const createTask = async (task) => {
    const { title } = task;
    const dateUTC = new Date(Date.now()).toUTCString();
    const query = 'INSERT INTO tasks(title, status, created_at) VALUES (?, ?, ?)';
    const [createdTask] = await connection.execute(query, [title, 'Pendente', dateUTC]);
    return {insertId: createdTask.insertId};
};

const deleteTask = async (id) => {
    const query = 'DELETE FROM tasks WHERE id = ?';
    const [removedTask] = await connection.execute(query, [id]);
    return removedTask;
};

const updateTask = async (id, task) => {
    const {title, status} = task;
    const query = 'UPDATE tasks SET title = ?, status = ? WHERE id = ?';
    const [updatedTask] = await connection.execute(query, [title, status, id]);
    return updatedTask;
};

module.exports = {
    getAll,
    createTask,
    deleteTask,
    updateTask
};