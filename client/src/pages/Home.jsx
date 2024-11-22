import { useState, useEffect } from "react";
import api from "../api";

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
			const res = await api.post("/api/notes", { content, title });

			if (res.status === 201) alert("Successfully created a note");
			else alert("Failed to create a note");
		} catch (err) {
			console.log("Error creating a note");
			alert(err);
		}

		getNotes();
	};

	const deleteNote = async (id) => {
		try {
			const res = await api.delete(`/api/notes/delete/${id}`);

			if (res.status === 204) alert("Note has been deleted!");
			else
				alert(
					"An error has occurred while attempting to delete this note!"
				);

			console.log(res.data);
		} catch (err) {
			console.log("Error deleting a note");
			alert(err);
		}

		getNotes();
	};

	return (
		<div>
			<h1>Home</h1>

			{notes.map((n) => {
				return n;
			})}
		</div>
	);
};

export default Home;
