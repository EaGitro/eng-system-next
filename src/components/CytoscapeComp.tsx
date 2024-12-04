import { type CSSProperties, useEffect, useRef } from "react";

import cytoscape from "cytoscape";

/**
 *
 * @param style Assign React CSS object
 * @param cy Assign a callback function. With this callback function, the user can directly interact with `cy`.
 * @param cyListeners  Add listeners cy.on( events [, selector], function(event) ) {@link https://js.cytoscape.org/#cy.on}
 * @returns
 */
export default function CytoscapeComp({
	autolock = false,
	autoungrabify = false,
	autounselectify = false,
	boxSelectionEnabled = true,
	className,
	cy,
	cyListeners,
	data,
	desktopTapThreshold = 4,
	elements,
	// multiClickDebounceTime = 250,
	headless = false,
	hideEdgesOnViewport = false,
	layout,
	maxZoom = 1e50,
	minZoom = 1e-50,
	motionBlur = false,
	motionBlurOpacity = 0.2,
	pan = { x: 0, y: 0 },
	panningEnabled = true,
	pixelRatio = "auto",
	ready,
	selectionType = "single",
	style,
	styleEnabled = true,
	stylesheet,
	textureOnViewport = false,
	touchTapThreshold = 8,
	userPanningEnabled = true,
	userZoomingEnabled = true,
	wheelSensitivity = 1,
	zoom = 1,
	zoomingEnabled = true,
	// extensions   // Execute 'cytoscape.use(ext)' on the user side
}: {
	/**
	 * The react className attribute
	 */
	autolock?: boolean;

	/**
	 * The css style attribute
	 */
	autoungrabify?: boolean;

	/**
	 * A callback function. Receive cy() object
	 */
	autounselectify?: boolean;

	/**
	 * cy.on( events [, selector], function(event) )
	 * {@link https://js.cytoscape.org/#cy.on}
	 */
	boxSelectionEnabled?: boolean;
	className?: string;
	cy?: ((cy: cytoscape.Core) => void) | undefined;
	cyListeners?: {
		events:
		| cytoscape.CollectionEventName
		| cytoscape.UserInputDeviceEventName
		| cytoscape.UserInputDeviceEventNameExt
		| cytoscape.GraphEventName;
		handler: cytoscape.EventHandler;
		selector?: string;
	}[];
	data?: Record<string, any> | undefined;
	desktopTapThreshold?: number;
	elements?: cytoscape.ElementDefinition[];
	headless?: boolean;
	hideEdgesOnViewport?: boolean;
	layout?: cytoscape.LayoutOptions | undefined;
	maxZoom?: number;
	minZoom?: number;
	motionBlur?: boolean;
	motionBlurOpacity?: number;
	pan?: { x: number; y: number };
	panningEnabled?: boolean;
	pixelRatio?: "auto" | number;
	ready?: cytoscape.EventHandler;
	selectionType?: "single" | "additive";
	style?: CSSProperties | undefined;
	styleEnabled?: boolean;
	// multiClickDebounceTime?: number,
	stylesheet?:
	| cytoscape.Stylesheet[]
	| Promise<cytoscape.Stylesheet[]>
	| undefined;
	textureOnViewport?: boolean;
	touchTapThreshold?: number;
	userPanningEnabled?: boolean;
	userZoomingEnabled?: boolean;
	wheelSensitivity?: number;
	zoom?: number;
	zoomingEnabled?: boolean;
}) {
	const cyElemRef = useRef<HTMLDivElement>(null);

	// let cyInstance = useRef(
	//     cytoscape({
	//         // container: cyElemRef.current,
	//         style: stylesheet,
	//         elements,
	//         layout,
	//         data,
	//         zoom,
	//         pan,
	//         minZoom,
	//         maxZoom,
	//         zoomingEnabled,
	//         userZoomingEnabled,
	//         panningEnabled,
	//         userPanningEnabled,
	//         boxSelectionEnabled,
	//         selectionType,
	//         touchTapThreshold,
	//         desktopTapThreshold,
	//         autolock,
	//         autoungrabify,
	//         autounselectify,
	//         // multiClickDebounceTime,
	//         headless,
	//         styleEnabled,
	//         hideEdgesOnViewport,
	//         textureOnViewport,
	//         motionBlur,
	//         motionBlurOpacity,
	//         wheelSensitivity,
	//         pixelRatio
	//     }))
	// cyElemRef.current && (cyElemRef.current.className = className ? className : "")
	useEffect(() => {
		const cyInstance = cytoscape({
			autolock,
			autoungrabify,
			autounselectify,
			boxSelectionEnabled,
			container: cyElemRef.current,
			data,
			desktopTapThreshold,
			elements,
			// multiClickDebounceTime,
			headless,
			hideEdgesOnViewport,
			layout,
			maxZoom,
			minZoom,
			motionBlur,
			motionBlurOpacity,
			pan,
			panningEnabled,
			pixelRatio,
			selectionType,
			style: stylesheet,
			styleEnabled,
			textureOnViewport,
			touchTapThreshold,
			userPanningEnabled,
			userZoomingEnabled,
			wheelSensitivity,
			zoom,
			zoomingEnabled,
		});

		/**
		 * add listeners
		 */
		cyListeners?.forEach((listener) => {
			if (listener.selector) {
				cyInstance
					// .current
					.on(listener.events, listener.selector, listener.handler);
			} else {
				cyInstance
					// .current
					.on(listener.events, listener.handler);
			}
		});

		if (cy) {
			cy(cyInstance);
		}

		(typeof ready === "function") && cyInstance?.ready(ready);

		/**
		 * remove listeners
		 */
		return () => {
			cyElemRef && cyInstance.removeAllListeners();
			cyElemRef &&
				cyInstance
					// .current
					.destroy();
		};
	}, []);

	return <div id="cy" ref={cyElemRef} style={style} />;
}
