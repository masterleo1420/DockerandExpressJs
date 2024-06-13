const express = require('express')
const mysql = require('mysql2/promise')
const app = express()

const port = 8000




const initMySQL = async () => {
    conn = await mysql.createConnection({
        host: 'db',
        user: 'root',
        password: 'root',
        database: 'tutorial'
    })
}

// gat all user
app.get('/user', async (req, res) => {
    try {
        const [result] = await conn.query('SELECT firstname FROM user')
        res.json(result[0])
    } catch (error) {
        console.log('Error fetching users:',error.message);
        res.status(500).json({error: 'Error fetching users'})
    }

})

//get find user by id
app.get('/users:id', async (req, res) => {

    res.json(users)
})

Post
app.post('/users', async (req, res) => {
    const data = req.body
  
    try {
      const result = await conn.query('INSERT INTO users SET ?', data)
      const userId = result[0].insertId
      res.status(201).json({ message: 'User created successfully', userId })
    } catch (error) {
      console.error('Error creating user:', error.message)
      res.status(500).json({ error: 'Error creating user' })
    }
  })

  app.put('/users/:id', async (req, res) => {
    const id = req.params.id
    const data = req.body
  
    try {
      const result = await conn.query('UPDATE users SET ? WHERE id = ?', [data, id])
      if (result[0].affectedRows === 0) {
        return res.status(404).json({ error: 'User not found' })
      }
      res.json({ message: 'User updated successfully', userId: id })
    } catch (error) {
      console.error('Error updating user:', error.message)
      res.status(500).json({ error: 'Error updating user' })
    }
  })

//     // find user id req
//     let selectedIndex = users.findIndex(user => user.id == id)

//     //update users
//     users[selectedIndex].name = updateUser.name || users[selectedIndex].name
//     users[selectedIndex].lastname = updateUser.lastname || users[selectedIndex].lastname
//     res.json({
//         message: 'Update complete',
//         data: {
//             user: updateUser,
//             indexUpdate: selectedIndex
//         }
//     })
// })

app.delete('/users/:id', async (req, res) => {
    const id = req.params.id
  
    try {
      const result = await conn.query('DELETE FROM users WHERE id = ?', [id])
      if (result[0].affectedRows === 0) {
        return res.status(404).json({ error: 'User not found' })
      }
      res.json({ message: 'User deleted successfully', userId: id })
    } catch (error) {
      console.error('Error deleting user:', error.message)
      res.status(500).json({ error: 'Error deleting user' })
    }
  })

app.listen(port, async () => {
    await initMySQL()
    console.log(`Server running at http://localhost:${port}/`)
})