import { createAsyncThunk } from '@reduxjs/toolkit';
import { FETCH_QUIZ_DATA } from "./constants";

export const fetchquizData = createAsyncThunk(FETCH_QUIZ_DATA, async () => {
    return fetch("https://opentdb.com/api.php?amount=15")
        .then((response) => {
            if (!response.ok && response.status !== 200) throw new Error(`Network response was not ok: ${response.status}`);

            return response.json()
        })
        .then((data) => {
            console.log("Received data:", data);

            return data
        });
});