// sample-data.ts
export const sampleUsers = [
    {
        User: {
            Title: "John Smith",
            EMail: "john.smith@company.com"
        },
        Modified: "2024-11-01T09:30:00Z",
        Id: 1
    },
    {
        User: {
            Title: "Sarah Johnson",
            EMail: "sarah.j@company.com"
        },
        Modified: "2024-11-01T08:15:00Z",
        Id: 2
    },
    {
        User: {
            Title: "Michael Chen",
            EMail: "m.chen@company.com"
        },
        Modified: "2024-10-31T16:45:00Z",
        Id: 3
    },
    {
        User: {
            Title: "Emma Wilson",
            EMail: "emma.wilson@company.com"
        },
        Modified: "2024-10-31T14:20:00Z",
        Id: 4
    },
    {
        User: {
            Title: "Carlos Rodriguez",
            EMail: "c.rodriguez@company.com"
        },
        Modified: "2024-10-30T11:10:00Z",
        Id: 5
    },
    {
        User: {
            Title: "Priya Patel",
            EMail: "p.patel@company.com"
        },
        Modified: "2024-10-30T09:55:00Z",
        Id: 6
    },
    {
        User: {
            Title: "Alex Thompson",
            EMail: "alex.t@company.com"
        },
        Modified: "2024-10-29T15:30:00Z",
        Id: 7
    },
    {
        User: {
            Title: "Lisa Anderson",
            EMail: "l.anderson@company.com"
        },
        Modified: "2024-10-29T13:25:00Z",
        Id: 8
    },
    {
        User: {
            Title: "David Kim",
            EMail: "d.kim@company.com"
        },
        Modified: "2024-10-28T16:40:00Z",
        Id: 9
    },
    {
        User: {
            Title: "Rachel Brown",
            EMail: "r.brown@company.com"
        },
        Modified: "2024-10-28T10:15:00Z",
        Id: 10
    },
    {
        User: {
            Title: "Mohammed Al-Said",
            EMail: "m.alsaid@company.com"
        },
        Modified: "2024-10-27T14:50:00Z",
        Id: 11
    },
    {
        User: {
            Title: "Sophie Martin",
            EMail: "s.martin@company.com"
        },
        Modified: "2024-10-27T11:35:00Z",
        Id: 12
    }
];

// Type definition for the data structure
export interface UserData {
    User: {
        Title: string;
        EMail: string;
    };
    Modified: string;
    Id: number;
}