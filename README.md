# AtoS (Audio to Subtitles)

A command-line tool for transcribing audio files to text using OpenAI's Whisper model.

## Prerequisites

- [Bun](https://bun.sh) runtime (v1.0.7 or later)
- OpenAI API key

## Setup

1. Install dependencies:

   ```bash
   bun install
   ```

2. Set up your OpenAI API key:
   - Copy `.env.example` to create a new `.env` file
   - Add your OpenAI API key to the `.env` file:
   ```
   OPENAI_API_KEY=your-api-key-here
   ```

## Usage

1. Place your audio files (MP3/WAV) in the `audio` directory.

2. Run the transcription process:

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

## Output

Transcribed files will be saved in the `transcripts` directory with the same base name as the input audio file.

## Notes

- Supports MP3 and WAV audio files
- Optimized for Polish language transcription
- Automatically formats output with proper sentence breaks
