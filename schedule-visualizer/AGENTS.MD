# Schedule Visualizer

Schedule visualizer is a plain HTML tool designed for sports clubs attending tournaments with multiple teams. It helps managers and coaches visualize match schedules across different teams and days, making it easy to identify available time slots for planning meals, rest periods, team meetings, and other logistics.

The tool displays events from multiple teams side by side on a unified timeline, allowing managers to quickly see when teams are playing, when there are gaps between matches, and when the entire club is free for coordinated activities like lunch or team briefings. 

## User workflow

### Use case: Tournament schedule management

When a sports club attends a tournament with multiple teams (e.g., U12, U14, U16), each team has its own match schedule. Managers need to:
- See all team schedules at a glance
- Identify time slots when all teams are free (for lunch, team meetings, etc.)
- Plan logistics around match times
- Share schedules with other coaches and parents

Each input box (group) typically represents one team's schedule. The optional header can be used to label teams (e.g., "U12 Boys", "U14 Girls").

### Input screen

- Multiple input boxes (groups) can be added or removed dynamically - one for each team
- Each group has:
  - An optional header input field (for team names, e.g., "U12 Boys", "U14 Girls")
  - A textarea for match schedule input
- Schedule format: `HH:MM-HH:MM` (e.g., `09:10-10:20` for a match from 9:10 AM to 10:20 AM)
- Day names can be written in the textarea (they will be used to group events in the visualization)
- Empty lines are ignored
- The following example shows a tournament schedule with matches on Saturday ("Lauantai") and Sunday ("Sunnuntai"):

Example:

```
Lauantai
09:10-10:20
13:50-14:40
16:00-16:55

Sunnuntai
08:15-09:05
13:00-15:11
```

- If no day name is specified, all events from a group are treated as belonging to a single day
- "Add Group" button to add more input boxes
- "Generate Link" button creates a shareable URL with compressed data in the query parameters

### Output screen

The visualization provides a clear overview of all team schedules, making it easy to:
- Identify when matches are happening across all teams
- Spot gaps between matches (useful for planning lunch breaks, warm-ups, etc.)
- See which teams are playing simultaneously
- Plan coordinated activities when multiple teams are free

Visual features:
- Events are automatically grouped by day name (extracted from textarea content)
- All events share the same time range (calculated from the earliest start to latest end time, with 30-minute padding) - this ensures all teams' schedules are visually comparable
- Each input box (group/team) has a different color, assigned automatically from a predefined color palette - makes it easy to distinguish between teams
- Events are visualized in columns (one per day)
- Within each day column, events from different teams are shown side-by-side - you can see which teams are playing at the same time
- Overlapping events within the same team are automatically placed in separate lanes (e.g., if a team has back-to-back matches)
- Time labels are displayed on the left side at nice intervals (15, 30, 60, 120, etc. minutes)
- Hourly grid lines are shown for better time reference
- Gaps between consecutive events (60+ minutes) are visualized with dashed lines and duration labels - perfect for identifying lunch windows or rest periods
- Group headers show:
  - Day name (main header)
  - Team names (if provided in headers) shown as sub-items aligned with their respective lanes

### Additional features

- **URL-based state sharing**: Schedules can be saved and shared via URL parameters - managers can generate a link and share it with other coaches, parents, or tournament organizers. The link contains all schedule data, so recipients see the exact same visualization.
- **Data compression**: Schedule data is compressed using gzip before encoding in URL - keeps URLs manageable even with multiple teams and days
- **Automatic visualization updates**: The visualization updates instantly as you type, making it easy to experiment with different schedules
- **Responsive layout**: Works well on different screen sizes - useful when viewing on tablets or phones at the tournament venue
- **No external dependencies**: Single HTML file that works offline - perfect for tournaments where internet connectivity might be unreliable

## Technical requirements

- HTML
- JavaScript, no external libraries, use modern features (ES6+, async/await, CompressionStream API)
- CSS, use modern features and use CSS variables to parametrize the CSS
- All functionality contained in a single HTML file

