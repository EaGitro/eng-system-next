export type CytoscapeCompProps = {
	style: CSSProperties | undefined;

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
			| cytoscape.UserInputDeviceEventNameExt;
		selector?: string;
		handler: cytoscape.EventHandler;
	}[];
	elements?: cytoscape.ElementDefinition[];
	styleSheet?:
		| cytoscape.Stylesheet[]
		| Promise<cytoscape.Stylesheet[]>
		| undefined;
	layout?: cytoscape.LayoutOptions | undefined;
	data?: Record<string, any> | undefined;
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
	extensions?: cytoscape.Ext[];
};
