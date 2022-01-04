import { useState, ChangeEvent } from "react"
import './style.css'

type Props = {
    onAdd: (title: string, body: string) => void
}

export const PostForm = ({ onAdd }: Props) => {
    const [addTitleText, setAddTitleText] = useState('')
    const [addBodyText, setAddBodyText] = useState('')

    const handleAddTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAddTitleText(e.target.value)
    }
    const handleAddBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setAddBodyText(e.target.value)
    }

    const handleAddClick = () => {
        if(addTitleText && addBodyText) {
            onAdd(addTitleText, addBodyText)
        } else {
            alert("Preencha os campos")
        }
    }

    return (
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
    )
}