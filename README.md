# BasicTableData

## Inicializar la tabla

Primero importa el objeto *BasicTableData*.

```
import BasicTableData from "./wherever/you/have/the/file.js";
```

Ahora hay que definir las propiedades de la tabla. La configuración consta de tres elementos: *columns*, *populateFunction* y *numberOfRows*.

### columns

*Columns* es un objeto. Su estructura es de la siguiente manera:

```
const columns = {
	// Nombre del campo, así se guardará el valor
	id: {
		// Campo desde la API (opcional)
		// Si no se especifica toma el nombre del campo
		prop: 'folio',

		// Valor por default en caso que el valor sea undefined (opcional)
		default: '0',

		// Define si se puede ordenar respecto a este campo (opcional)
		sortable: true,

		// Define el tipo de ordenamiento que va a tener (opcional)
		// 'numeric' || 'string'
		type: 'numeric',
	},
	...
};
```

### populateFunction

*populateFunction* es una función que se inyecta a la dependencia. Esta función debe de retornar un *array* de objetos. Cada objeto es un registro de la tabla. Las propiedades de cada objeto son las especificadas en *columns*.

Un ejemplo de esta función es:

```
const baseUrl = new URL('https://dummyjson.com/products');
const populateFunction = async () => {
	const url = baseUrl.href;
	const response = await fetch(url);

	const data = await response.json();

	const { products } = data;

	return products;
};
```

### numberOfRows

*numberOfRows* es un *integer* positivo que define la cantidad de registros que hay en una página.

### Crear una instancia

Ya tenemos todos los elementos para definir la tabla.

```
const config = {
	columns,
	populateFunction,
	numberOfRows,
}
```

Ahora creamos la instancia *tableData*.

```
const tableData = new BasicTableData(config);

tableData.init().then(() => console.log('Table Data populated...'));
```

## Getters

### Obtener una página

```
// Obtener la primera página
const firstPage = tableData.getPage(1);

// Otra forma de obtener la primera página
const sameFirstPage = tableData.getFirstPage();

// Obtener la siguiente página
const nextPage = tableData.getNextPage();

// Obtener la página anterior
const previousPage = tableData.getPreviousPage();

// Obtener la última página
const lastPage = tableData.getLastPage();
```

Internamente, la instancia conserva la página actual y cada que se obtiene una página con alguno de los *getters* anteriores, este valor se actualiza de acuerdo a la página obtenida.

También es posible obtener toda la información almacenada:

```
// Obtener la información después de aplicar el ordenamiento y filtro.
const filteredData = tableData.getData();

// Obtener la información ordenada sin aplicar el filtro.
const data = tableData.getRawData();
```

Ahora, para obtener un solo registro, ejecuta lo siguiente:

```
// Index del elemento en el arreglo después de aplicar el filtro
const index = 8;
const record = tableData.getRecord(index);

// Elemento en el array sin filtrar
const rawRecord = table.getRecordFromRawData(index);
```

Para obtener los indicadores de los registros de una determinada página:

```
// Obtener los indicadores de la segunda página.
const page = 2;

const { firstIndex, lastIndex } = tableData.getPageIndex(page);
```

Obtener la cantidad de registros:

```
// Cantidad de registros después del filtrado
const numberOfRecords = tableData.getNumberOfRecords();

// Cantidad de registros antes del filtrado
const numberOfRawRecords = tableData.getNumberOfRawRecords();
```

Obtener información adicional

```
// Número de páginas
const numberOfPages = tableData.getNumberOfPages();

// Página actual
const currentPage = tableData.getCurrentPage();
```

## Setters

```
// Cambiar el número de filas por página
tableData.setNumberOfRows(15);

// Cambiar la página actual
tableData.setCurrentPage(3);
```

## Ordenamiento

Para ordenar respecto a un campo en específico:

```
// Orden respecto a un campo
tableData.sortByField('id');

// Reversa
tableData.reverse();

// Si se vuelve a ejecutar respecto al mismo criterio de orden, internamente se ejecuta tableData.reverse();

```

## Filtro

```
// Filtro aplicado en todos los campos
tableData.filterByKeyword('keyword');

// Filtro aplicado respecto a un campo específico
tableData.filterByField('field', 'keyword');
```

## Dudas

Cualquier duda o comentario, favor de mandarlo al correo: anadieleimportatududa@yahoo.com.

Saludos.