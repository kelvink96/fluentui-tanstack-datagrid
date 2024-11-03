import {ColumnDef} from "@tanstack/react-table";
import {
    Button,
    Card,
    CardHeader,
    FluentProvider,
    Menu,
    MenuItem,
    MenuList,
    MenuPopover,
    MenuTrigger,
    SearchBox,
    Text,
    Title3,
    tokens,
    webLightTheme
} from "@fluentui/react-components"
import {
    bundleIcon,
    DeleteFilled,
    DeleteRegular,
    EyeFilled,
    EyeRegular,
    MoreHorizontalFilled,
    MoreHorizontalRegular
} from "@fluentui/react-icons";

import {Flex, Table, UserAvatar} from './components';

import {dateFormatter} from "./utils";

import {sampleUsers, UserData} from "./constants";

import './App.css'
import {useMemo, useState} from "react";

const EditIcon = bundleIcon(EyeFilled, EyeRegular)
const DeleteIcon = bundleIcon(DeleteFilled, DeleteRegular)
const MenuIcon = bundleIcon(MoreHorizontalFilled, MoreHorizontalRegular)

function App() {
    const [searchQuery, setSearchQuery] = useState('');

    const columns: ColumnDef<UserData>[] = [
        {
            accessorKey: '',
            header: 'User',
            cell: ({row}) => {
                return (
                    <UserAvatar
                        name={row.original?.User?.Title ?? 'undefined'}
                        email={row.original?.User?.EMail}
                    />
                );
            }
        },
        {
            accessorKey: '',
            header: 'User',
            cell: ({row}) => {
                return <Text className="text-lowercase">{row.original?.User?.EMail}</Text>;
            }
        },
        {
            accessorKey: 'Modified',
            header: 'Modified',
            cell: ({row}) => {
                return <Text>{dateFormatter(row.original?.Modified ?? '')}</Text>;
            }
        },
        {
            header: 'Actions',
            cell: ({row}) => {
                return (
                    <Flex>
                        <Button
                            icon={<EditIcon color={tokens.colorPaletteBlueForeground2}/>}
                            onClick={() => {
                                alert(row.original.Id);
                            }}
                        >
                            View
                        </Button>
                        <Button
                            icon={<DeleteIcon color={tokens.colorPaletteRedForeground1}/>}
                            onClick={() => {
                                alert(row.original.Id);
                            }}
                        >
                            Delete
                        </Button>
                        <Menu>
                            <MenuTrigger disableButtonEnhancement>
                                <Button icon={<MenuIcon/>}/>
                            </MenuTrigger>

                            <MenuPopover>
                                <MenuList>
                                    <MenuItem>New </MenuItem>
                                    <MenuItem>New Window</MenuItem>
                                    <MenuItem disabled>Open File</MenuItem>
                                    <MenuItem>Open Folder</MenuItem>
                                </MenuList>
                            </MenuPopover>
                        </Menu>
                    </Flex>
                );
            }
        }
    ];

    // Filter data based on search query
    const filteredData = useMemo(() => {
        return sampleUsers.filter(user => {
            const searchTerm = searchQuery.toLowerCase();
            const userName = user.User.Title.toLowerCase();
            const userEmail = user.User.EMail.toLowerCase();

            return userName.includes(searchTerm) || userEmail.includes(searchTerm);
        });
    }, [searchQuery]);

    return (
        <FluentProvider theme={webLightTheme}>
            <Card>
                <CardHeader
                    header={<Title3>Fluentui x Tanstack DataGrid</Title3>}
                    action={<SearchBox
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(_e, data) => setSearchQuery(data.value)}
                    />}
                />
                <Table data={filteredData} columns={columns} showPagination showPageCount/>
            </Card>
            <Flex justify="center" style={{marginTop: "3rem"}}>
                <Text>
                    Built with 💖 by Kelvin (</Text>
                <a href="https://github.com/kelvink96" target="_blank">kelvink96</a>
                <Text>) </Text>
            </Flex>
        </FluentProvider>
    )
}

export default App
