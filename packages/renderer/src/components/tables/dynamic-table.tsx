import React, { SVGProps } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  Select,
  SelectItem,
} from "@nextui-org/react";

/* -------------------------------------------------------------------------- */
/*                             Type Declarations                              */
/* -------------------------------------------------------------------------- */

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
interface StatusOption {
  name: string;
  uid: string; // must be string if we'll use it as a key
}
/** The statuses to display */
const statusOptions: StatusOption[] = [
  { name: "Completed", uid: "completed" },
  { name: "Ongoing", uid: "ongoing" },
  { name: "Stale", uid: "stale" },
];

/** Use a union of "all" or a Set of keys. */
/**
 * The shape of each record in your data array.
 * If you have a more specific shape, define it here.
 */
export interface DynamicDataRecord {
  [key: string]: unknown;
}

/**
 * Column definition interface.
 */
interface ColumnDef {
  name: string;
  uid: string;
  sortable?: boolean;
}

/**
 * NextUI's sorting interface.
 */
// column: string;        // inherited
// direction: "ascending" | "descending"; // inherited

/**
 * For rows-per-page selection data
 */
interface SelectionType {
  key: number;
  label: string;
}

/**
 * Props for our dynamic dashboard table.
 */
interface DynamicDashboardTableProps {
  data: DynamicDataRecord[];
}

/**
 * Mapping from status strings to Chip color.
 */
const statusColorMap: Record<string, ChipProps["color"]> = {
  completed: "success",
  ongoing: "secondary",
  stale: "warning",
};

/* -------------------------------------------------------------------------- */
/*                                   Icons                                    */
/* -------------------------------------------------------------------------- */

function capitalize(s: string): string {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

export const VerticalDotsIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps): JSX.Element => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={size || height}
      role="presentation"
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
        fill="currentColor"
      />
    </svg>
  );
};

export const SearchIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps): JSX.Element => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={size || height || "1em"}
      role="presentation"
      viewBox="0 0 24 24"
      width={size || width || "1em"}
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );
};

export const ChevronDownIcon = ({
  strokeWidth = 1.5,
  ...otherProps
}: IconSvgProps): JSX.Element => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...otherProps}
    >
      <path
        d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

/* -------------------------------------------------------------------------- */
/*                          Utilities & Sample Data                           */
/* -------------------------------------------------------------------------- */

const rowsPerPageObj: SelectionType[] = [
  { key: 5, label: "5" },
  { key: 10, label: "10" },
  { key: 15, label: "15" },
];

/**
 * Safely convert an unknown cell value to a string for display.
 * - If it's an object, we JSON.stringify it.
 * - If it's null/undefined, return empty string.
 * - Otherwise, cast to string.
 */
function formatCellValue(value: unknown): string {
  if (value == null) return "";
  if (typeof value === "object") {
    try {
      return JSON.stringify(value);
    } catch {
      return "[object]";
    }
  }
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return String(value);
  }
  return "";
}

/* -------------------------------------------------------------------------- */
/*                      Dynamic, Fully-Typed Table Component                  */
/* -------------------------------------------------------------------------- */

export default function DynamicDashboardTable({
  data,
}: DynamicDashboardTableProps): JSX.Element {
  /**
   * React states (all typed to avoid implicit `any`):
   */
  const [filterValue, setFilterValue] = React.useState<string>("");
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
  const [page, setPage] = React.useState<number>(1);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "status",
    direction: "ascending",
  });

  /**
   * 1) Collect all unique keys from the data
   */
  const allKeys: string[] = React.useMemo(() => {
    const keysSet = new Set<string>();
    for (const item of data) {
      for (const key of Object.keys(item)) {
        keysSet.add(key);
      }
    }
    return Array.from(keysSet);
  }, [data]);

  /**
   * 2) Build dynamic columns
   */
  const dynamicColumns: ColumnDef[] = React.useMemo(() => {
    return allKeys.map((key: string) => {
      return {
        name: capitalize(key),
        uid: key,
        sortable: ["id", "name", "description", "status"].includes(key),
      };
    });
  }, [allKeys]);

  /**
   * If you want a dedicated "Actions" column,
   * add it explicitly here.
   */
  const columnsWithActions: ColumnDef[] = React.useMemo(() => {
    return [
      ...dynamicColumns,
      { name: "Actions", uid: "actions", sortable: false },
    ];
  }, [dynamicColumns]);

  /**
   * 3) Filtering logic
   */
  const hasSearchFilter: boolean = Boolean(filterValue);

  const filteredItems: DynamicDataRecord[] = React.useMemo(() => {
    let filtered = [...data];

    if (hasSearchFilter) {
      filtered = filtered.filter((item: DynamicDataRecord) => {
        const rawName = item.name ?? "";
        const nameValue =
          typeof rawName === "string"
            ? rawName.toLowerCase()
            : JSON.stringify(rawName).toLowerCase();

        return nameValue.includes(filterValue.toLowerCase());
      });
    }

    const hasStatusKey = allKeys.includes("status");
    if (hasStatusKey && statusFilter !== "all") {
      const selectedStatuses = Array.from(statusFilter);
      if (selectedStatuses.length && selectedStatuses[0] !== "all") {
        filtered = filtered.filter((item: DynamicDataRecord) => {
          const itemStatus = typeof item.status === "string" ? item.status : "";
          return selectedStatuses.includes(itemStatus);
        });
      }
    }
    return filtered;
  }, [data, filterValue, hasSearchFilter, statusFilter, allKeys]);

  /**
   * 4) Pagination logic
   */
  const pages: number = Math.ceil(filteredItems.length / rowsPerPage);

  const pageItems: DynamicDataRecord[] = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, rowsPerPage, filteredItems]);

  /**
   * 5) Sorting logic
   */
  const sortedItems: DynamicDataRecord[] = React.useMemo(() => {
    const { column, direction } = sortDescriptor;
    if (!allKeys.includes(String(column))) return pageItems;

    const sorted = [...pageItems].sort((a, b) => {
      const first = a[column];
      const second = b[column];
      if (first == null || second == null) return 0;

      const cmp = formatCellValue(first).localeCompare(
        formatCellValue(second),
        undefined,
        { numeric: true, sensitivity: "base" },
      );
      return direction === "ascending" ? cmp : -cmp;
    });
    return sorted;
  }, [sortDescriptor, pageItems, allKeys]);

  /**
   * 6) Render cell
   *    - We explicitly handle each case:
   *      - status -> Chip
   *      - actions -> Dropdown
   *      - otherwise -> formatCellValue()
   */
  const renderCell = React.useCallback(
    (item: DynamicDataRecord, columnKey: React.Key): JSX.Element => {
      if (typeof columnKey !== "string") return <></>;

      // Actions column
      if (columnKey === "actions") {
        return (
          <div
            className="relative flex justify-end items-center gap-2"
            aria-label="dashboard actions"
          >
            <Dropdown>
              <DropdownTrigger>
                <Button
                  isIconOnly
                  size="sm"
                  variant="ghost"
                  aria-label="open actions"
                >
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu className="text-black text-lg drop-shadow-md">
                <DropdownItem key="view" aria-label="view">
                  View
                </DropdownItem>
                <DropdownItem key="edit" aria-label="edit">
                  Edit
                </DropdownItem>
                <DropdownItem key="delete" aria-label="delete">
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      }

      // Status column -> Chip
      if (columnKey === "status") {
        const valueStr = formatCellValue(item[columnKey]);
        const chipColor = statusColorMap[valueStr] ?? "default";
        return (
          <Chip
            className="capitalize"
            color={chipColor}
            size="sm"
            aria-label="dashboard status"
            variant="flat"
          >
            {valueStr}
          </Chip>
        );
      }

      if (columnKey == "description") {
        const valueStr = formatCellValue(item[columnKey]);
        return <div className="text-tiny text-gray-400">{valueStr}</div>;
      }

      // Otherwise -> fallback to string
      const displayValue: string = formatCellValue(item[columnKey]);
      return <div style={{ whiteSpace: "nowrap" }}>{displayValue}</div>;
    },
    [],
  );

  /**
   * 7) Handlers
   */
  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newVal = Number(e.target.value);
      setRowsPerPage(newVal);
      setPage(1);
    },
    [],
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  /**
   * 8) Top content
   */
  const topContent: JSX.Element = React.useMemo(() => {
    const hasStatusKey = allKeys.includes("status");
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          {/* Search input */}
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            aria-label="Search by name"
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={onClear}
            onValueChange={onSearchChange}
          />

          <div className="flex gap-3">
            {/* Status Dropdown (only if the data has a 'status' field) */}
            {hasStatusKey && (
              <Dropdown aria-label="status dropdown">
                <DropdownTrigger className="hidden sm:flex">
                  <Button
                    endContent={<ChevronDownIcon className="text-small" />}
                    variant="flat"
                  >
                    Status
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  disallowEmptySelection
                  aria-label="Status filters"
                  closeOnSelect={false}
                  selectedKeys={statusFilter}
                  selectionMode="multiple"
                  onSelectionChange={setStatusFilter}
                >
                  {statusOptions.map((status) => (
                    <DropdownItem key={status.uid} className="capitalize">
                      {capitalize(status.name)}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            )}

            {/* Columns Dropdown */}
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                <>
                  {dynamicColumns.map((col: ColumnDef) => (
                    <DropdownItem key={col.uid} className="capitalize">
                      {col.name}
                    </DropdownItem>
                  ))}
                  {/* We also have "Actions" as a column */}
                  <DropdownItem key="actions" className="capitalize">
                    Actions
                  </DropdownItem>
                </>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            {filteredItems.length} Records
          </span>
          <div className="flex items-center text-sm space-x-3">
            <div className="whitespace-nowrap">Rows per page</div>
            <div className="min-w-[75px]">
              <Select
                onChange={onRowsPerPageChange}
                defaultSelectedKeys={String(rowsPerPage)}
                aria-label="rows per page"
              >
                {rowsPerPageObj.map((rows: SelectionType) => (
                  <SelectItem aria-label="number of rows" key={rows.key}>
                    {rows.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </div>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    dynamicColumns,
    filteredItems.length,
    onRowsPerPageChange,
    onSearchChange,
    onClear,
    allKeys,
    rowsPerPage,
  ]);

  /**
   * 9) Bottom content
   */
  const bottomContent: JSX.Element = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400" />
        <Pagination
          isCompact
          showControls
          showShadow
          aria-label="change pages"
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2" />
      </div>
    );
  }, [page, pages]);

  /**
   * 10) Filter columns to display
   */
  const headerColumns: ColumnDef[] = React.useMemo(() => {
    if (visibleColumns === "all") return columnsWithActions;
    const visibleColsSet = new Set(Array.from(visibleColumns));
    return columnsWithActions.filter((col: ColumnDef) =>
      visibleColsSet.has(col.uid),
    );
  }, [visibleColumns, columnsWithActions]);

  /**
   * Finally, render the table
   */
  return (
    <Table
      isHeaderSticky
      aria-label="Searchable dynamic table"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[400px] min-h-[400px]",
      }}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column: ColumnDef) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody emptyContent="No records found" items={sortedItems}>
        {(item: DynamicDataRecord) => {
          const possibleKey = item.id ?? item.name;
          const itemKey =
            typeof possibleKey === "string" || typeof possibleKey === "number"
              ? String(possibleKey)
              : JSON.stringify(item);

          return (
            <TableRow key={itemKey}>
              {(columnKey: React.Key) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          );
        }}
      </TableBody>
    </Table>
  );
}
