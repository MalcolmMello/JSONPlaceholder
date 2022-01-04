import { useState, useEffect, ChangeEvent } from "react";
import { Post } from './types/Post'
import { PostForm } from './components/PostForm'
import { PostItem } from './components/PostItem'

function App() {
	const [posts, setPosts] = useState<Post[]>([])
	const [loading, setLoading] = useState(false)

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

  	const handleAddPost = async (title: string, body: string) => {
		let response = await fetch('https://jsonplaceholder.typicode.com/posts', {
			method: 'POST',
			body: JSON.stringify({title, body, userId: 1}),
			headers: {'Content-Type': 'application/json'}
		});
		let json = await response.json()
		console.log(json)
	}

	return (
		<div>
			{loading &&
				<div>Carregando...</div>
			}

			<PostForm onAdd={handleAddPost}/>

			{!loading && posts.length > 0 &&
				<>
					<div>Total posts: {posts.length}</div>
					<div>
						{posts.map((item, index) => (
							<PostItem data={item} key={index}/>
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