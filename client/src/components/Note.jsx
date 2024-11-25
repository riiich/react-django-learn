import "../styles/Note.css";

const Note = ({ note, deleteNote }) => {
	return (
		<div className="note">
			<h2>Title: {note.title}</h2>
			<p>ID: {note.id}</p>
			<p>Content: {note.content}</p>
			<p>{note.author}</p>
			<p>{note.createdAt}</p>
			<button onClick={() => deleteNote(note.id)}>Delete</button>
		</div>
	);
};

export default Note;
