import "./frontend.scss";
import React, { useState, useReducer, useEffect } from "react";
import ReactDOM from "react-dom";

const divsToUpdate = document.querySelectorAll(".goldunitconverter-update-me");

divsToUpdate.forEach((div) => {
	const data = JSON.parse(div.querySelector("pre").innerText);
	ReactDOM.render(<OurComponent {...data} />, div);
	div.classList.remove("goldunitconverter-update-me");
});
//https://hextobinary.com/unit/weight/from/ana/to/gram
function OurComponent(props) {
	const [unitA, setUintA] = useState("gram");
	const [unitB, setUintB] = useState("gram");
	const [quantity, setQuantity] = useState(1);
	const [result, setResult] = useState(1);
	function calculateUnit(unit = "gram") {
		if (unit === "gram") return 1;
		else if (unit === "milligram") return 0.001;
		else if (unit === "kg") return 1000;
		else return 1;
	}

	const handleunitA = (e) => {
		setUintA(e.target.value);
	};
	const handleunitB = (e) => {
		setUintB(e.target.value);
	};
	const handlequantity = (e) => {
		setQuantity(e.target.value);
	};

	useEffect(() => {
		const unitAA = calculateUnit(unitA);
		const unitBB = calculateUnit(unitB);
		setResult((unitAA * quantity) / unitBB);
	}, [unitA, unitB, quantity]);

	return (
		<div className="goldunitconverter-frontend">
			<p>
				<input
					type="number"
					name="quantity"
					min="0"
					placeholder="Quantity"
					onChange={handlequantity}
					defaultValue={quantity}
					style={{ width: "100%" }}
				/>
			</p>
			<p>
				<select
					name="unitA"
					id="unitA"
					onChange={handleunitA}
					style={{ width: "100%" }}
				>
					<option selected="selected" value="gram">
						Gram
					</option>
					<option value="milligram">Milligram</option>
					<option value="kg">Kilogram</option>
				</select>
			</p>
			<p>=</p>
			<p>
				<select
					name="unitB"
					id="unitB"
					onChange={handleunitB}
					style={{ width: "100%" }}
				>
					<option selected="selected" value="gram">
						Gram
					</option>
					<option value="milligram">Milligram</option>
					<option value="kg">Kilogram</option>
				</select>
			</p>
			<p></p>
			<h2 id="result">
				{result <= 1
					? result.toFixed(3) + " " + unitB
					: result.toFixed(3) + " " + unitB}
			</h2>
		</div>
	);
}
