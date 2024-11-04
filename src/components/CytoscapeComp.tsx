import cytoscape from "cytoscape";
import { type CSSProperties, useEffect, useRef } from "react";

/**
 *
 * @param style Assign React CSS object
 * @param cy Assign a callback function. With this callback function, the user can directly interact with `cy`.
 * @param cyListeners  Add listeners cy.on( events [, selector], function(event) ) {@link https://js.cytoscape.org/#cy.on}
 * @returns
 */
export default function CytoscapeComp({
	className,
	style,
	cy,
	cyListeners,
	elements,
	stylesheet,
	layout,
	data,
	ready,
	zoom = 1,
	pan = { x: 0, y: 0 },
	minZoom = 1e-50,
	maxZoom = 1e50,
	zoomingEnabled = true,
	userZoomingEnabled = true,
	panningEnabled = true,
	userPanningEnabled = true,
	boxSelectionEnabled = true,
	selectionType = "single",
	touchTapThreshold = 8,
	desktopTapThreshold = 4,
	autolock = false,
	autoungrabify = false,
	autounselectify = false,
	// multiClickDebounceTime = 250,
	headless = false,
	styleEnabled = true,
	hideEdgesOnViewport = false,
	textureOnViewport = false,
	motionBlur = false,
	motionBlurOpacity = 0.2,
	wheelSensitivity = 1,
	pixelRatio = "auto",
	// extensions   // Execute 'cytoscape.use(ext)' on the user side
}: {
	/**
	 * The react className attribute
	 */
	className?: string;

	/**
	 * The css style attribute
	 */
	style?: CSSProperties | undefined;

	/**
	 * A callback function. Receive cy() object
	 */
	cy?: ((cy: cytoscape.Core) => void) | undefined;

	/**
	 * cy.on( events [, selector], function(event) )
	 * {@link https://js.cytoscape.org/#cy.on}
	 */
	cyListeners?: {
		events:
		| cytoscape.CollectionEventName
		| cytoscape.UserInputDeviceEventName
		| cytoscape.UserInputDeviceEventNameExt
		| cytoscape.GraphEventName
		selector?: string;
		handler: cytoscape.EventHandler;
	}[];
	elements?: cytoscape.ElementDefinition[];
	stylesheet?:
	| cytoscape.Stylesheet[]
	| Promise<cytoscape.Stylesheet[]>
	| undefined;
	layout?: cytoscape.LayoutOptions | undefined;
	data?: Record<string, any> | undefined;
	ready?: cytoscape.EventHandler;
	zoom?: number;
	pan?: { x: number; y: number };
	minZoom?: number;
	maxZoom?: number;
	zoomingEnabled?: boolean;
	userZoomingEnabled?: boolean;
	panningEnabled?: boolean;
	userPanningEnabled?: boolean;
	boxSelectionEnabled?: boolean;
	selectionType?: "single" | "additive";
	touchTapThreshold?: number;
	desktopTapThreshold?: number;
	autolock?: boolean;
	autoungrabify?: boolean;
	autounselectify?: boolean;
	// multiClickDebounceTime?: number,
	headless?: boolean;
	styleEnabled?: boolean;
	hideEdgesOnViewport?: boolean;
	textureOnViewport?: boolean;
	motionBlur?: boolean;
	motionBlurOpacity?: number;
	wheelSensitivity?: number;
	pixelRatio?: "auto" | number;
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
			container: cyElemRef.current,
			style: stylesheet,
			elements,
			layout,
			data,
			zoom,
			pan,
			minZoom,
			maxZoom,
			zoomingEnabled,
			userZoomingEnabled,
			panningEnabled,
			userPanningEnabled,
			boxSelectionEnabled,
			selectionType,
			touchTapThreshold,
			desktopTapThreshold,
			autolock,
			autoungrabify,
			autounselectify,
			// multiClickDebounceTime,
			headless,
			styleEnabled,
			hideEdgesOnViewport,
			textureOnViewport,
			motionBlur,
			motionBlurOpacity,
			wheelSensitivity,
			pixelRatio,
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

		(ready !== undefined) && cyInstance?.ready(ready);

		return () => {
			cyElemRef && cyInstance.removeAllListeners();
			cyElemRef &&
				cyInstance
					// .current
					.destroy();
		};
	}, []);

	return <div id="cy" style={style} ref={cyElemRef} />;
}
