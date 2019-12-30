import React from 'react';

import ItemsTableCell from '../../components/ItemsTableCell';
import ItemsTableValue from '../../components/ItemsTableValue';

var LocalFileColumn = React.createClass({
	renderValue: function () {
		var value = this.props.data.fields[this.props.col.path];
		if (!value || !value.filename) return;
		return value.filename;
	},
	render: function () {
		var value = this.props.data.fields[this.props.col.path];
		var href = value && value.url ? value.url : null;
		var label = value && value.filename ? value.filename : null;
		return (
			<ItemsTableCell href={href} padded interior field={this.props.col.type} style={{position :'relative'}}>
				{/*<ItemsTableValue>{label}</ItemsTableValue>*/}
				<ItemsTableValue>

					<div style={{
						"backgroundImage" : "url("+href+")",//+"/:/rs=w:32,h:32,m/cr=w:32,h:32"
						backgroundSize : 'cover',
						backgroundRepeat : 'no-repeat',
						backgroundPosition : 'center',
						width: '32px',
						height: '32px',
						/*position: 'absolute',
    					top: '4px',*/
					}}/>

				</ItemsTableValue>
			</ItemsTableCell>
		);
	},
});

module.exports = LocalFileColumn;
