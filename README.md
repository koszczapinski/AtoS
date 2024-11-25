# AtoS (Audio to Subtitles)

A command-line tool that transcribes audio files using OpenAI's Whisper model.

## Features

- Batch process multiple audio files
- Support for multiple languages
- Customizable input and output directories
- Progress tracking and detailed logging
- Summary report after completion

## Prerequisites

- [Bun](https://bun.sh/) runtime
- OpenAI API key

## Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   bun install
   ```

3. Set up your OpenAI API key:
   - Copy `.env.example` to create a new `.env` file
   - Add your OpenAI API key to the `.env` file:
   ```
   OPENAI_API_KEY=your-api-key-here
   ```

## Usage

Basic usage with default options:

```bash
bun transcribe
```

This command will:

- Rename audio files to remove spaces and special characters
- Transcribe all audio files to text
- Format the output with proper line breaks

### Additional Commands

- `bun rename` - Clean up audio file names
- `bun format` - Format existing transcript files
- `bun clean` - Remove all files from audio and transcripts directories
- `bun youtube` - Download audio from YouTube to the ./audio directory

## Output

Transcribed files will be saved in the `transcripts` directory with the same base name as the input audio file.

## Notes

- Supports MP3 and WAV audio files
- Optimized for Polish language transcription
- Automatically formats output with proper sentence breaks

### Options

- `-l, --lang <language>` - Specify the language to transcribe to (default: "en")
- `-i, --input-dir <directory>` - Set input directory (default: "./audio")
- `-o, --output-dir <directory>` - Set output directory (default: "./transcripts")

Example with options:

```bash
bun transcribe --lang pl --input-dir ./my-audio --output-dir ./my-transcripts
```

## Directory Structure

```
.
├── audio/          # Default input directory for audio files
├── transcripts/    # Default output directory for transcriptions
├── api/            # API related files
├── index.ts        # Main application file
└── utils.ts        # Utility functions
```

## Output Format

Transcriptions are saved as text files in the output directory. The filename will match the input audio file's name (without the audio extension).

## Error Handling

- The tool provides detailed error messages for failed transcriptions
- A summary report shows successful and failed transcriptions
- Failed transcriptions don't stop the batch process

## Contributing

Feel free to submit issues and pull requests.

## License

MIT
