import { useEffect, useRef, useState } from "react";
import { Annotorious } from "@recogito/annotorious";

import "@recogito/annotorious/dist/annotorious.min.css";
import WeldImg from "./weld.png";
function Annotator() {
	// Ref to the image DOM element
	const imgEl = useRef();

	// The current Annotorious instance
	const [anno, setAnno] = useState();

	// Current drawing tool name
	const [tool, setTool] = useState("rect");

	// Init Annotorious when the component
	// mounts, and keep the current 'anno'
	// instance in the application state
	useEffect(() => {
		let annotorious = null;

		if (imgEl.current) {
			// Init
			annotorious = new Annotorious({
				image: imgEl.current,
			});

			// Attach event handlers here
			annotorious.on("createAnnotation", (annotation) => {
				console.log("created", annotation.target.selector.value);
			});

			annotorious.on("updateAnnotation", (annotation, previous) => {
				console.log("updated", annotation, previous);
			});

			annotorious.on("deleteAnnotation", (annotation) => {
				console.log("deleted", annotation);
			});
		}

		// Keep current Annotorious instance in state
		setAnno(annotorious);

		// Cleanup: destroy current instance
		return () => annotorious.destroy();
	}, []);

	// Toggles current tool + button label
	const toggleTool = () => {
		if (tool === "rect") {
			setTool("polygon");
			anno.setDrawingTool("polygon");
		} else {
			setTool("rect");
			anno.setDrawingTool("rect");
		}
	};

	return (
		<div>
			<div>
				<button onClick={toggleTool}>
					{tool === "rect" ? "RECTANGLE" : "POLYGON"}
				</button>
			</div>

			<img
				ref={imgEl}
				src={WeldImg}
				// src="https://en.pimg.jp/023/182/267/1/23182267.jpg"
				alt="Weld"
			/>
		</div>
	);
}

export default Annotator;
