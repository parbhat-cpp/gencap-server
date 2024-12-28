
# GenCap Server


## Installation

Fork and clone my project. After that run the installation command.

```bash
  npm install
```

To run on dev environment
```bash
  npm run dev
```

To create a build
```bash
  npm run build
```
    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`GROQ_API_KEY` = Using Groq to access Llama vision AI

`TOKEN_VALUE` = Provided by Cloudflare

`AWS_ACCESS_KEY_ID` = Provided by Cloudflare

`AWS_SECRET_ACCESS_KEY` = Provided by Cloudflare

`R2_BUCKET_NAME` = Cloudflare R2 bucket name

`R2_ENDPOINT` = Provided by Cloudflare

`R2_ACCESS_URL` = Provided by Cloudflare to access image



## API Reference

### Images API

#### Uploads image to Cloudflare R2 bucket

```http
  POST /api/image/upload
```

#### Delete image from Cloudflare R2 bucket

```http
  POST /api/image/delete
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `object-key`      | `string` | **Required**. object-key to delete image |

### AI API

#### Generate captions

```http
  POST /api/ai/generate-captions
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `image-name`      | `string` | **Required**. To access image from Cloudflare bucket |
| `caption-length`      | `string` | **Optional**. To set length of the captions. Values allowed ["short length", "medium length", "long length"] |
| `user-prompt` | `string` | **Optional**. To add additional information with image |

## Tech Stack

**Client:** React, TailwindCSS, Shadcn ([Client repo](https://github.com/parbhat-cpp/gencap))

**Server:** Node, Express, Cloudflare R2, Llama vision AI API

## Authors

- [@parbhat-cpp](https://www.github.com/parbhat-cpp)

