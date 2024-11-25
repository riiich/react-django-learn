import { useState, useEffect } from "react";
import api from "../api";
import "../styles/Home.css";
import Note from "../components/Note";

const Home = () => {
	const [notes, setNotes] = useState([]);
	const [content, setContent] = useState("");
	const [title, setTitle] = useState("");

	useEffect(() => {
		getNotes();
	}, []);

	const getNotes = async () => {
		try {
			const res = await api.get("/api/notes");

			setNotes(res.data);
			console.log(res.data);
		} catch (err) {
			console.log("Error retrieving notes");
			alert(err);
		}
	};

	const createNote = async () => {
		try {
			const res = await api.post("/api/notes/", { content, title });

			if (res.status !== 201) alert("Failed to create a note");
		} catch (err) {
			console.log("Error creating a note");
			alert(err);
		}

		getNotes();
	};

	const deleteNote = async (id) => {
		try {
			const res = await api.delete(`/api/notes/delete/${id}`);

			// if (res.status === 204) alert("Note has been deleted!");
			// else alert("An error has occurred while attempting to delete this note!");

			getNotes();
			console.log(res.data);
		} catch (err) {
			console.log("Error deleting a note");
			alert(err);
		}
	};

	return (
		<div>
			<h2>Create a Note</h2>

			<form onSubmit={createNote} className="note-form">
				<label htmlFor="title">Title: </label>
				<br />
				<input
					type="text"
					id="title"
					name="title"
					value={title}
					required
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Enter title..."
				/>

				<label htmlFor="content">Content: </label>
				<br />
				<textarea
					id="content"
					name="content"
					value={content}
					onChange={(e) => setContent(e.target.value)}
					placeholder="Enter your description of your note..."
				/>
				<br />

				<button type="submit">Submit</button>
			</form>

			<div className="note-section">
				<h2>Notes ({notes.length})</h2>

				<div className="notes">
					{notes.map((n) => (
						<div key={n.id} className="individual-note">
							<Note key={n.id} note={n} deleteNote={deleteNote} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Home;
