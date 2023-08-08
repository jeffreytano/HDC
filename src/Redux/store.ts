import { configureStore } from "@reduxjs/toolkit";
import teamBuildReducer from "./TeamBuild";

export default configureStore({
    reducer: {
        teamBuild: teamBuildReducer,
    }
});