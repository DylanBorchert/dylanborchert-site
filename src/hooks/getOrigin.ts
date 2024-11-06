"use client";
import { useEffect, useState } from "react";

function useOrigin() {
	const [currentUrl, setCurrentUrl] = useState("");

	useEffect(() => {
		// Check if the code is running on the client side
		if (process) {
			// Access the current page URL using window.location
			setCurrentUrl(window.location.href);
		}
	}, []);

	return currentUrl;
}

export default useOrigin;
