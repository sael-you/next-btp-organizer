# Morocco Building Project Organizer

A full-stack Next.js application for planning, tracking, and managing building/construction projects in Morocco. This application helps you manage project milestones, track expenses, calculate budgets, and forecast ROI.

## Features

- **Project Management**: Create and manage multiple building projects with detailed information
- **Milestone Tracking**: Break down projects into milestones and tasks with due dates and priorities
- **Expense Tracking**: Record and categorize expenses with support for Moroccan Dirham (MAD)
  - Categories: Land, Permits, Materials, Labour, Utilities, and Other
  - Track payment status and vendor information
- **Budget Analysis**:
  - Real-time budget vs. actual expense comparison
  - Over-budget warnings
  - Category-wise budget breakdown
- **Financial Calculators**:
  - ROI (Return on Investment) Calculator
  - Mortgage/Loan Calculator with payment breakdowns
- **Document Management**: Attach contracts, invoices, permits, and plans to projects
- **Dashboard**: Visual overview of all projects with progress tracking

## Tech Stack

- **Frontend**: Next.js 16 with App Router, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Backend**: Next.js API Routes
- **Database**: SQLite with Prisma ORM
- **Language**: TypeScript

## Prerequisites

- Node.js 18.x or higher
- npm or yarn

## Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd next-btp-organizer
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

4. **Generate Prisma Client and create database**:
   ```bash
   npm run db:generate
   npm run db:push
   ```

   Alternatively, run the complete setup:
   ```bash
   npm run setup
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```

6. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma Client
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Prisma Studio (database GUI)
- `npm run db:seed` - Seed database with sample data
- `npm run setup` - Complete setup (install + generate + push)

## Project Structure

```
next-btp-organizer/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── dev.db                 # SQLite database (generated)
├── src/
│   ├── app/
│   │   ├── api/               # API Routes
│   │   │   ├── projects/      # Project CRUD operations
│   │   │   ├── milestones/    # Milestone management
│   │   │   ├── expenses/      # Expense tracking
│   │   │   └── calculations/  # Budget, ROI, mortgage calculators
│   │   └── page.tsx           # Main dashboard page
│   └── lib/
│       ├── prisma.ts          # Prisma client singleton
│       ├── calculations.ts    # Financial calculation utilities
│       └── types.ts           # TypeScript type definitions
├── .env                       # Environment variables
├── .env.example              # Example environment variables
└── package.json              # Dependencies and scripts
```

## Database Schema

The application uses the following main entities:

- **Project**: Main project entity with budget and status tracking
- **Milestone**: Project milestones with due dates and priorities
- **Task**: Individual tasks within milestones
- **Expense**: Expense records with categories and payment status
- **BudgetItem**: Planned budget items by category
- **Document**: File attachments for projects

## API Endpoints

### Projects
- `GET /api/projects` - List all projects
- `POST /api/projects` - Create a new project
- `GET /api/projects/[id]` - Get a single project
- `PUT /api/projects/[id]` - Update a project
- `DELETE /api/projects/[id]` - Delete a project

### Milestones
- `GET /api/milestones?projectId=[id]` - List milestones (optionally filtered by project)
- `POST /api/milestones` - Create a new milestone
- `GET /api/milestones/[id]` - Get a single milestone
- `PUT /api/milestones/[id]` - Update a milestone
- `DELETE /api/milestones/[id]` - Delete a milestone

### Expenses
- `GET /api/expenses?projectId=[id]` - List expenses (optionally filtered by project)
- `POST /api/expenses` - Create a new expense
- `GET /api/expenses/[id]` - Get a single expense
- `PUT /api/expenses/[id]` - Update an expense
- `DELETE /api/expenses/[id]` - Delete an expense

### Calculations
- `GET /api/calculations/budget?projectId=[id]` - Calculate budget analysis
- `POST /api/calculations/roi` - Calculate ROI
- `POST /api/calculations/mortgage` - Calculate mortgage payments

## Usage Guide

### Creating a Project

1. Click the "+ New Project" button on the dashboard
2. Fill in project details:
   - Name (required)
   - Description
   - Location
   - Start and end dates
   - Total budget in MAD
3. Save the project

### Adding Expenses

1. Navigate to a project
2. Add expenses with:
   - Category (Land, Permits, Materials, Labour, Utilities, Other)
   - Description
   - Amount in MAD
   - Vendor information
   - Invoice number
   - Payment status

### Budget Analysis

The dashboard automatically shows:
- Total budget vs. actual expenses
- Over-budget warnings
- Category-wise spending breakdown
- Remaining budget

### Using Calculators

#### ROI Calculator
1. Navigate to Tools > ROI Calculator
2. Enter:
   - Investment cost
   - Expected revenue
   - Annual operating costs (optional)
3. View ROI percentage and break-even analysis

#### Mortgage Calculator
1. Navigate to Tools > Mortgage Calculator
2. Enter:
   - Loan amount
   - Annual interest rate
   - Loan term in years
3. View monthly payment, total payment, and interest breakdown

## Exposing with ngrok

To test the application remotely using ngrok:

1. **Install ngrok** (if not already installed):
   ```bash
   # macOS
   brew install ngrok

   # Or download from https://ngrok.com/download
   ```

2. **Start the Next.js development server**:
   ```bash
   npm run dev
   ```

3. **In a separate terminal, start ngrok**:
   ```bash
   ngrok http 3000
   ```

4. **Access your app**:
   ngrok will provide a public URL (e.g., `https://abc123.ngrok.io`) that you can use to access your application from anywhere.

## Environment Variables

- `DATABASE_URL` - SQLite database connection string
- `NEXT_PUBLIC_APP_NAME` - Application name (displayed in UI)
- `NEXT_PUBLIC_CURRENCY` - Default currency (MAD)
- `MAX_FILE_SIZE` - Maximum file upload size in bytes
- `UPLOAD_DIR` - Directory for uploaded documents

## Development Notes

- The database file (`dev.db`) is created in the `prisma` directory
- Uploaded documents will be stored in the `uploads` directory (create if needed)
- Both directories are gitignored for security

## Troubleshooting

### Prisma Client Generation Issues

If you encounter issues generating the Prisma Client:

```bash
# Try with checksum ignore flag
PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1 npx prisma generate
```

### Database Schema Changes

After modifying the Prisma schema:

```bash
npm run db:push
npm run db:generate
```

### Port Already in Use

If port 3000 is already in use:

```bash
# Run on a different port
PORT=3001 npm run dev
```

## Future Enhancements

- User authentication and multi-user support
- File upload functionality for documents
- Email notifications for milestone due dates
- Export reports to PDF
- Mobile responsive improvements
- Data visualization with charts
- Multi-currency support
- Integration with Moroccan tax regulations

## License

This project is for personal use.

## Support

For issues or questions, please create an issue in the repository.
