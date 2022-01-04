import { useState, useEffect, ChangeEvent } from "react";
import { Post } from './types/Post'

function App() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)

  const [addTitleText, setAddTitleText] = useState('')
  const [addBodyText, setAddBodyText] = useState('')

  useEffect(() => {
	loadPosts()
  }, [])

  const loadPosts = async () => {
	  setLoading(true)
	  let response = await fetch('https://jsonplaceholder.typicode.com/posts')
	  let json = await response.json()
	  setLoading(false)
	  setPosts(json)
  }

  const handleAddTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
	  setAddTitleText(e.target.value)
  }
  const handleAddBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
	setAddBodyText(e.target.value)
  }
  const handleAddClick = async () => {
	  if(addTitleText && addBodyText) {
		let response = await fetch('https://jsonplaceholder.typicode.com/posts', {
			method: 'POST',
			body: JSON.stringify({
				title: addTitleText,
				body: addBodyText,
				userId: 1
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		});
		let json = await response.json()

		console.log(json)
	  } else {
		alert('preencha os dados')
	  }
  }


  return (
    <div>
		{loading &&
			<div>Carregando...</div>
		}

		<fieldset>
			<legend>Adicionar novo post</legend>

			<input
				value={addTitleText}
				onChange={handleAddTitleChange}
				className="input" 
				type="text" 
				placeholder="Digite um título"
			/>
			<textarea 
				value={addBodyText}
				onChange={handleAddBodyChange}
				className="input"
			>
			</textarea>
			<button onClick={handleAddClick} className="input">Adicionar</button>

		</fieldset>

		{!loading && posts.length > 0 &&
			<>
				<div>Total posts: {posts.length}</div>
				<div>
					{posts.map((item, index) => (
						<div key={index}>
							<h4>{item.title}</h4>
							<small>#{item.id} - Usuário: {item.userId}</small>
							<p>{item.body}</p>
						</div>
  					))}
				</div>
			</>
		}

		{!loading && posts.length === 0 &&
			<div>Não há posts para exibir</div>
		}
    </div>
  );
}

export default App;
