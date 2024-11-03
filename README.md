# Fluent TanStack Grid

A powerful and customizable data grid component built with Fluent UI and TanStack Table (React Table v8). This component combines the beautiful design system of Fluent UI with the powerful features of TanStack Table to create a feature-rich data grid solution.

![Fluent TanStack Grid Screenshot](placeholder-for-screenshot.png)

## Features

- 🎨 **Fluent UI Design System** - Beautiful, consistent Microsoft design language
- 📊 **TanStack Table Integration** - Powerful table functionality with minimal setup
- 🔍 **Real-time Search** - Fast, client-side search across all fields
- 📱 **Responsive Design** - Works seamlessly across different screen sizes
- 📄 **Pagination** - Built-in pagination for large datasets
- 👤 **User Avatar Integration** - Visual user representation with Fluent UI avatars
- 📅 **Date Formatting** - Clean, consistent date display
- 🎯 **Action Buttons** - Integrated view, delete, and more actions
- 🌈 **Theme Support** - Follows Fluent UI theming system

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/fluent-tanstack-grid.git

# Navigate to project directory
cd fluent-tanstack-grid

# Install dependencies
npm install
```

## Dependencies

This project requires the following packages:

```json
{
  "dependencies": {
    "@fluentui/react-components": "^9.x.x",
    "@fluentui/react-icons": "^2.x.x",
    "@tanstack/react-table": "^8.x.x",
    "react": "^18.x.x",
    "react-dom": "^18.x.x"
  }
}
```

## Usage

Basic usage example:

```tsx
import { Table } from './components';
import { sampleUsers } from './constants';

function App() {
  return (
    <Table 
      data={sampleUsers} 
      columns={columns} 
      showPagination 
    />
  );
}
```

With search functionality:

```tsx
import { useState, useMemo } from 'react';
import { SearchBox } from '@fluentui/react-components';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(() => {
    return sampleUsers.filter(user => {
      const searchTerm = searchQuery.toLowerCase();
      const userName = user.User.Title.toLowerCase();
      const userEmail = user.User.EMail.toLowerCase();
      
      return userName.includes(searchTerm) || userEmail.includes(searchTerm);
    });
  }, [searchQuery]);

  return (
    <>
      <SearchBox 
        placeholder="Search users..."
        value={searchQuery}
        onChange={(e, data) => setSearchQuery(data.value)}
      />
      <Table 
        data={filteredData} 
        columns={columns} 
        showPagination
      />
    </>
  );
}
```

## Data Structure

The component expects data in the following format:

```typescript
interface UserData {
  User: {
    Title: string;
    EMail: string;
  };
  Modified: string;
  Id: number;
}
```

## Customization

### Columns Configuration

You can customize the columns by modifying the columns definition:

```typescript
const columns: ColumnDef<UserData>[] = [
  {
    accessorKey: '',
    header: 'User',
    cell: ({row}) => {
      return (
        <UserAvatar
          name={row.original?.User?.Title}
          email={row.original?.User?.EMail}
        />
      );
    }
  },
  // ... more columns
];
```

### Theming

The component uses Fluent UI's theming system. You can customize the theme by wrapping your app with `FluentProvider`:

```tsx
import { FluentProvider, webLightTheme } from "@fluentui/react-components";

function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      {/* Your components */}
    </FluentProvider>
  );
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Microsoft Fluent UI Team
- TanStack Table Team
- All contributors to this project

## Support

For support, please open an issue in the GitHub repository or contact [your-email@example.com].