import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useTable, usePagination, useFilters, useGlobalFilter, useRowSelect } from 'react-table';
import matchSorter from 'match-sorter';
import './react-table-user_4h.css';
import { DataContext } from '../../contexts/DataContext';

function DefaultColumnFilter({ column: { filterValue, setFilter, preFilteredRows } }) {
  // const contador = preFilteredRows.length;
  // const count = preGlobalFilteredRows.length;

  return (
    <input
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Buscar...`}
      // placeholder={`Buscar en ${count} registros`}
      style={{
        width: '85%',
        marginTop: '6px',
        padding: '8px',
        fontSize: '0.8rem',
        fontFamily: 'Roboto',
      }}
    />
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

// Our table component
function ReactTableUserH({ data, title, columns }) {
  const { setId, setTablaItems, setObjeto, mainArray, setMainArray, setUserSelected } = useContext(
    DataContext
  );
  let history = useHistory();
  const [datosSeleccionados, setDatosSeleccionados] = React.useState([]);
  const [diseabled, setDiseabled] = React.useState(true);
  const [showInfo, setShowInfo] = React.useState(false);
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue).toLowerCase().startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // allColumns,
    // getToggleHideAllColumnsProps,
    selectedFlatRows,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, selectedRowIds, filters },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      defaultColumn,
      filterTypes,
      title,
    },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    usePagination,
    useRowSelect,
    // Here we will use a plugin to add our selection column
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        return [
          {
            id: 'selection',
            // Make this column a groupByBoundary. This ensures that groupBy columns
            // are placed after it
            groupByBoundary: true,
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
              </div>
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ];
      });
    }
  );

  function handleDatos() {
    let array = [];
    selectedFlatRows.map((d) => {
      array.push(d.original);
    });
    if (array.length > 1 || array.length < 1) {
      setDiseabled(false);
    } else {
      setDiseabled(true);
      setDatosSeleccionados(array);
      let obj = { tipo: 'user' };
      obj.id = array[0].id;
      setObjeto(obj);
      setId(array[0].id);
      setTablaItems(false);
      console.log('array =>', array[0].id);
      history.push('/resultado');
    }
  }
  function selectUsers() {
    let array = [];
    selectedFlatRows.map((d) => {
      console.log('DDD', d.original.id);
      array.push(d.original.id);
    });
    let mainAr = [];
    let obj = {};
    obj.id = array;
    mainAr.push(obj);
    setMainArray(mainAr);
    setShowInfo(true);
    setUserSelected(true);
    console.log('array result 🐱‍🏍✔✔', mainArray);
  }

  const mostrarDatosSeleccionados = () => {
    let datos = mainArray;
    let obj = datos[0];
    if (showInfo) {
      return obj.id.map((e, i) => {
        console.log('EEEE ;;; ', e);
        return <strong key={i}>{<span>{e + ', '}</span>}</strong>;
      });
    } else {
      return null;
    }
  };
  // Render the UI for your table
  return (
    <>
      <h1>{title}</h1>
      {showInfo ? <h4>Usuarios Seleccionados : </h4> : null}
      {mostrarDatosSeleccionados()}

      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th className="search" {...column.getHeaderProps()}>
                  {column.render('Header')}
                  {/* Render the columns filter UI */}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Mostrar {pageSize}
            </option>
          ))}
        </select>
      </div>
      {showInfo ? (
        <div className="buttons">
          <button className="botonEnviar" onClick={selectUsers}>
            Cambiar seleccion
          </button>
        </div>
      ) : (
        <div className="buttons">
          <button className="botonEnviar" onClick={selectUsers}>
            Seleccionar
          </button>
        </div>
      )}
    </>
  );
}

const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = React.useRef();
  const resolvedRef = ref || defaultRef;

  React.useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <input type="checkbox" ref={resolvedRef} {...rest} />
    </>
  );
});
export default ReactTableUserH;
