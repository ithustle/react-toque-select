import { Box, ChakraProvider } from '@chakra-ui/react'
import { useState } from 'react';
import ReactToqueSelect from './react-toque-select';

const data = [
	'Bebidas',
	'Hamburguer',
	'Meet',
	'iPhone',
	'Android',
	'MiBox'
]

function App() {

	return (
		<ChakraProvider>
			<Box
				width={'xl'}
				height={'xl'}
				bg={'#666'}
				p={'10'}
			>
				<ReactToqueSelect 
					options={data}
					isMulti
					//onSelectOption={(value, index) => console.log(value, index)}
				/>
			</Box>
		</ChakraProvider>
	);
}

export default App;
