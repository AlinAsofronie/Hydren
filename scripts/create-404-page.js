#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Create a custom 404 page for static export
const html404 = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Not Found - Water Hygiene Solutions</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #1e293b;
        }
        
        .container {
            text-align: center;
            max-width: 600px;
            padding: 2rem;
        }
        
        .error-code {
            font-size: 8rem;
            font-weight: bold;
            color: #0ea5e9;
            line-height: 1;
            margin-bottom: 1rem;
        }
        
        h1 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            color: #0f172a;
        }
        
        p {
            font-size: 1.25rem;
            color: #64748b;
            margin-bottom: 2rem;
            line-height: 1.6;
        }
        
        .btn {
            display: inline-block;
            background: linear-gradient(135deg, #0ea5e9, #06b6d4);
            color: white;
            padding: 1rem 2rem;
            border-radius: 0.75rem;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(14, 165, 233, 0.2);
        }
        
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(14, 165, 233, 0.3);
        }
        
        .icon {
            font-size: 4rem;
            margin-bottom: 1rem;
        }
        
        @media (max-width: 768px) {
            .error-code {
                font-size: 6rem;
            }
            
            h1 {
                font-size: 2rem;
            }
            
            p {
                font-size: 1.125rem;
            }
            
            .container {
                padding: 1rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="icon">💧</div>
        <div class="error-code">404</div>
        <h1>Page Not Found</h1>
        <p>
            The page you're looking for doesn't exist. It might have been moved, 
            deleted, or you entered the wrong URL.
        </p>
        <a href="/" class="btn">Return to Homepage</a>
    </div>
    
    <script>
        // Redirect to homepage after 10 seconds
        setTimeout(() => {
            window.location.href = '/';
        }, 10000);
    </script>
</body>
</html>`;

// Ensure the out directory exists
const outDir = path.join(process.cwd(), 'out');
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

// Write the 404 page
const filePath = path.join(outDir, '404.html');
fs.writeFileSync(filePath, html404);

console.log('✅ Created 404.html page for static export');
console.log(`📝 Location: ${filePath}`);