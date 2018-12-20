import React from 'react';
import Card from './Card';

const List = ( {list_data,pick} ) => {
    return (
      	<div className="cards-list">
			<ul>
				{
					list_data.map( item =>  
						<li key={item.id} 
							className="card-item" 
							onClick={()=>pick(item)}> 
							<Card {...item} /> 
						</li> 
					)
				}
			</ul>
		</div>
    )
}
export default List
