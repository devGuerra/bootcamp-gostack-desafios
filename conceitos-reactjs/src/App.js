import React, { useEffect, useState } from 'react';

import './styles.css';
import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);
  const [repoTitle, setRepoTitle] = useState('');
  const [repoOwner, setRepoOwner] = useState('');

  useEffect(() => {
    api.get('/repositories').then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    // TODO
    const response = await api.post('/repositories', {
      title: repoTitle,
      owner: repoOwner,
    });

    setRepositories([...repositories, response.data]);
    setRepoTitle('');
    setRepoOwner('');
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`/repositories/${id}`).then(() => {
      const newList = repositories.filter((item) => item.id !== id);
      setRepositories(newList);
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((item) => (
          <li key={item.id}>
            {item.title}
            <button onClick={() => handleRemoveRepository(item.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <section>
        <input
          type="text"
          value={repoTitle}
          onChange={(e) => setRepoTitle(e.target.value)}
          placeholder="Titulo"
        />
        <input
          type="text"
          value={repoOwner}
          onChange={(e) => setRepoOwner(e.target.value)}
          placeholder="owner"
        />
        <button onClick={handleAddRepository}>Adicionar</button>
      </section>
    </div>
  );
}

export default App;
