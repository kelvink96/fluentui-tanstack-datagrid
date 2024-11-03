import {
    Button,
    makeStyles,
    Select,
    SpinButton,
    Spinner,
    Table as FluentTable,
    TableBody,
    TableCell,
    TableHeader,
    TableHeaderCell,
    TableProps as FluentTableProps,
    TableRow,
    Tag,
    Text
} from '@fluentui/react-components';
import {ArrowNextFilled, ArrowPreviousFilled, ChevronLeftFilled, ChevronRightFilled} from '@fluentui/react-icons';
import {memo, ReactElement, useCallback, useMemo, useState} from "react";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    useReactTable
} from '@tanstack/react-table';
import {Empty} from './Empty';
import {Flex} from './Flex';

const useStyles = makeStyles({
    focusVisible: {
        '&:focus-visible': {
            outline: '2px solid var(--colorBrandForeground1)',
            outlineOffset: '2px'
        }
    }
});

export type TableProps<TData, TValue> = Partial<FluentTableProps> & {
    data: TData[];
    columns: ColumnDef<TData, TValue>[];
    filters?: boolean;
    showPagination?: boolean;
    showPageCount?: boolean;
    showPageLength?: boolean;
    showPageSelector?: boolean;
    pageCount?: number;
    loading?: boolean
};

// Memoized TableRow component
const MemoizedTableRow = memo(
    ({row, onClick, index}: { row: any; onClick?: (row: any) => void; index: number }) => {
        const styles = useStyles();
        const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.(row);
            }
        }, [onClick, row]);

        return (
            <TableRow
                key={row.id}
                style={{borderBottom: 'none', marginBottom: '10px'}}
                onClick={() => onClick?.(row)}
                onKeyDown={handleKeyDown}
                tabIndex={0}
                role="row"
                aria-rowindex={index + 1}
                className={styles.focusVisible}
            >
                {row.getVisibleCells().map((cell: any, cellIndex: number) => (
                    <TableCell
                        key={cell.id}
                        role="cell"
                        aria-colindex={cellIndex + 1}
                    >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                ))}
            </TableRow>
        );
    },
    (prevProps, nextProps) => {
        return prevProps.row.id === nextProps.row.id &&
            JSON.stringify(prevProps.row.original) === JSON.stringify(nextProps.row.original);
    }
);

export const Table = <TData, TValue>(props: TableProps<TData, TValue>): ReactElement => {
    const {
        columns,
        data,
        showPageCount,
        showPageLength = true,
        showPageSelector = true,
        showPagination = true,
        pageCount,
        loading,
        ...others
    } = props;
    const [{pageIndex, pageSize}, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: pageCount ?? 10
    });

    const pagination = useMemo(
        () => ({
            pageIndex,
            pageSize
        }),
        [pageIndex, pageSize]
    );

    const handleTableKeyDown = useCallback((e: React.KeyboardEvent) => {
        const focusableElements = document.querySelectorAll('tr[tabindex="0"]');
        const currentIndex = Array.from(focusableElements).indexOf(document.activeElement as HTMLElement);

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                if (currentIndex < focusableElements.length - 1) {
                    (focusableElements[currentIndex + 1] as HTMLElement).focus();
                }
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (currentIndex > 0) {
                    (focusableElements[currentIndex - 1] as HTMLElement).focus();
                }
                break;
            case 'Home':
                e.preventDefault();
                (focusableElements[0] as HTMLElement).focus();
                break;
            case 'End':
                e.preventDefault();
                (focusableElements[focusableElements.length - 1] as HTMLElement).focus();
                break;
        }
    }, []);

    const table = useReactTable({
        data,
        columns,
        debugTable: true,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        //no need to pass pageCount or rowCount with client-side pagination as it is calculated automatically
        state: {
            pagination
        },
        enableColumnResizing: true
        // autoResetPageIndex: false, // turn off page index reset when sorting or filtering
    });

    // Memoize header groups
    const headerGroups = useMemo(() => table.getHeaderGroups(), [table]);

    // Memoize rows
    const rows = useMemo(() => table.getRowModel().rows, [table.getRowModel().rows]);

    if (loading) {
        return <Spinner label="Loading table data"/>;
    }

    if (data.length === 0) {
        return <Empty aria-label="No data available"/>;
    }

    return (
        <div
            role="region"
            aria-label="Data table with pagination"
            onKeyDown={handleTableKeyDown}
        >
            <FluentTable
                {...others}
                role="table"
                aria-rowcount={data.length}
                aria-colcount={columns.length}
                aria-busy={loading}
            >
                <TableHeader role="rowgroup">
                    {headerGroups.map((headerGroup) => (
                        <TableRow key={headerGroup.id} role="row">
                            {headerGroup.headers.map((header) => (
                                (
                                    <TableHeaderCell
                                        key={header.id}
                                        colSpan={header.colSpan}
                                        className={header.column.getCanSort() ? 'table-header-button' : ''}
                                        role="columnheader"
                                        aria-sort={header.column.getIsSorted() ?
                                            header.column.getIsSorted() === 'asc' ? 'ascending' : 'descending'
                                            : 'none'
                                        }
                                    >
                                        <Text
                                            weight="semibold"
                                            {...{
                                                className: header.column.getCanSort() ? 'cursor-pointer user-select-none' : '',
                                                onClick: header.column.getToggleSortingHandler(),
                                                role: header.column.getCanSort() ? 'button' : undefined,
                                                'aria-label': header.column.getCanSort()
                                                    ? `Sort by ${header.column.columnDef.header} ${
                                                        header.column.getIsSorted() === 'asc'
                                                            ? 'descending'
                                                            : 'ascending'
                                                    }`
                                                    : undefined
                                            }}
                                            style={{width: '100%'}}
                                        >
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                            {header.column.getCanSort() && (
                                                <span className="visually-hidden">
                                                {header.column.getIsSorted()
                                                    ? header.column.getIsSorted() === 'asc'
                                                        ? '(sorted ascending)'
                                                        : '(sorted descending)'
                                                    : '(not sorted)'}
                                            </span>
                                            )}
                                        </Text>
                                    </TableHeaderCell>
                                )
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {rows.map((row, index) => (
                            <MemoizedTableRow
                                key={row.id}
                                row={row}
                                index={index}
                            />
                        )
                    )}
                </TableBody>
            </FluentTable>
            <br/>
            {data.length > 0 && (
                <div
                    role="complementary"
                    aria-label="Table information and controls"
                >
                    <nav
                        role="navigation"
                        aria-label="Pagination"
                    >
                        <Flex justify="space-between">
                            {showPageCount && (
                                <Tag>
                                    Showing {table.getRowModel().rows.length.toLocaleString()} of{' '}
                                    {table.getRowCount().toLocaleString()} rows
                                </Tag>
                            )}
                            {showPageSelector && (
                                <Flex>
                                    <Flex>
                                        <div>Page</div>
                                        <Text weight="semibold">
                                            {table.getState().pagination.pageIndex + 1} of{' '}
                                            {table.getPageCount().toLocaleString()}
                                        </Text>
                                    </Flex>
                                    <Flex>
                                        | Go to page:
                                        <SpinButton
                                            min={1}
                                            max={table.getPageCount()}
                                            defaultValue={table.getState().pagination.pageIndex + 1}
                                            onChange={(_ev, data) => {
                                                const page = data.value ? Number(data.value) - 1 : 0;
                                                table.setPageIndex(page);
                                            }}
                                            style={{width: "25%"}}
                                        />
                                    </Flex>
                                </Flex>
                            )}
                            <Flex>
                                {showPageLength && (
                                    <Flex>
                                        <Select
                                            value={table.getState().pagination.pageSize}
                                            onChange={(e) => {
                                                table.setPageSize(Number(e.target.value));
                                            }}
                                        >
                                            {[5, 10, 20, 50].map((pageSize) => (
                                                <option key={pageSize} value={pageSize}>
                                                    Show {pageSize}
                                                </option>
                                            ))}
                                        </Select>
                                    </Flex>
                                )}
                                {showPagination && (
                                    <Flex>
                                        <Button
                                            onClick={() => table.firstPage()}
                                            disabled={!table.getCanPreviousPage()}
                                            icon={<ArrowPreviousFilled/>}
                                            appearance="subtle"
                                        />
                                        <Button
                                            onClick={() => table.previousPage()}
                                            disabled={!table.getCanPreviousPage()}
                                            icon={<ChevronLeftFilled/>}
                                            appearance="subtle"
                                        />
                                        <Button
                                            onClick={() => table.nextPage()}
                                            disabled={!table.getCanNextPage()}
                                            icon={<ChevronRightFilled/>}
                                            appearance="subtle"
                                        />
                                        <Button
                                            onClick={() => table.lastPage()}
                                            disabled={!table.getCanNextPage()}
                                            icon={<ArrowNextFilled/>}
                                            appearance="subtle"
                                        />
                                    </Flex>
                                )}
                            </Flex>
                        </Flex>
                    </nav>
                </div>
            )}
        </div>
    );
};
