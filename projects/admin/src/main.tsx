import { createRoot } from "react-dom/client";
import { App } from "./app";
import { StrictMode } from "react";

const root = document.getElementById("root");

if (root) {
	createRoot(root).render(
		<StrictMode>
			<App />
		</StrictMode>,
	);
}
