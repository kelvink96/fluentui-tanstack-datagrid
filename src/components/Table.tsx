import {
    Button,
    Select,
    SpinButton,
    Table as FluentTable,
    TableBody,
    TableCell,
    TableHeader,
    TableHeaderCell,
    TableProps as FluentTableProps,
    TableRow, Tag,
    Text
} from '@fluentui/react-components';
import {
    ArrowNextFilled,
    ArrowPreviousFilled,
    ArrowSortDownFilled,
    ArrowSortUpFilled,
    ChevronLeftFilled,
    ChevronRightFilled
} from '@fluentui/react-icons';
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
import * as React from 'react';
import {Empty} from './Empty';
import {Flex} from './Flex';

export type TableProps<TData, TValue> = Partial<FluentTableProps> & {
    data: TData[];
    columns: ColumnDef<TData, TValue>[];
    filters?: boolean;
    showPagination?: boolean;
    showPageCount?: boolean;
    showPageLength?: boolean;
    showPageSelector?: boolean;
    pageCount?: number;
};

export const Table = <TData, TValue>(props: TableProps<TData, TValue>): React.ReactElement => {
    const {
        columns,
        data,
        showPageCount,
        showPageLength = true,
        showPageSelector = true,
        showPagination = true,
        pageCount,
        ...others
    } = props;
    const [{pageIndex, pageSize}, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: pageCount ?? 10
    });

    const pagination = React.useMemo(
        () => ({
            pageIndex,
            pageSize
        }),
        [pageIndex, pageSize]
    );

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
        }
        // autoResetPageIndex: false, // turn off page index reset when sorting or filtering
    });

    if (data.length === 0) {
        return <Empty/>;
    }

    return (
        <div>
            <FluentTable {...others}>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHeaderCell
                                        key={header.id}
                                        colSpan={header.colSpan}
                                        className={header.column.getCanSort() ? 'table-header-button' : ''}
                                    >
                                        <Text
                                            weight="semibold"
                                            {...{
                                                className:
                                                    header.column.getCanSort() +
                                                    'd-flex align-items-center gap-1 w-100 fw-bold'
                                                        ? 'cursor-pointer user-select-none'
                                                        : '',
                                                onClick: header.column.getToggleSortingHandler()
                                            }}
                                            style={{width: '100%'}}
                                        >
                                            {flexRender(header.column.columnDef.header, header.getContext())}{' '}
                                            {{
                                                asc: <ArrowSortUpFilled fontSize={14}/>,
                                                desc: <ArrowSortDownFilled fontSize={14}/>
                                            }[header.column.getIsSorted() as string] ?? null}
                                        </Text>
                                    </TableHeaderCell>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map((row) => {
                        return (
                            <TableRow key={row.id} style={{borderBottom: 'none', marginBottom: '10px'}}>
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </FluentTable>
            <br/>
            {data.length > 0 && (
                <>
                    <Flex justify="space-between">
                        <Flex>
                            {showPageCount && (
                                <Tag>
                                    Showing {table.getRowModel().rows.length.toLocaleString()} of{' '}
                                    {table.getRowCount().toLocaleString()} rows
                                </Tag>
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
                    </Flex>
                    {/* // show page info */}
                    {/* <pre>{JSON.stringify(table.getState().pagination, null, 2)}</pre> */}
                </>
            )}
        </div>
    );
};
