import "./index.scss";
import React from "react";

wp.blocks.registerBlockType(
	"goldunitconverternamespace/goldunitconverter-block-name",
	{
		title: "GoldUnitConverter",
		icon: "welcome-learn-more",
		category: "common",
		attributes: {},
		edit: EditComponent,
		save: function () {
			return null;
		},
	}
);

function EditComponent(props) {
	return (
		<div className="goldunitconverterBlockTypeName">
			<h3>Unit Converter</h3>
		</div>
	);
}
