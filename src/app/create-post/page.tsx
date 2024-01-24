import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import React from "react";
import TextToImage from "@/views/TextToImage";

function CreatePost() {
  return (
    <div className="p-10">
      <div>
        <h1 className="scroll-m-10 text-3xl font-extrabold tracking-tight lg:text-3xl">
          Introduction
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6 ">
          The Images API provides three methods for interacting with images:
        </p>
        <ol className="list-decimal list-inside text-sm space-y-1 px-2 mt-2">
          <li>
            Creating images from scratch based on a text prompt (DALL·E 3 and
            DALL·E 2)
          </li>
          <li>
            Creating edited versions of images by having the model replace some
            areas of a pre-existing image, based on a new text prompt (DALL·E 2
            only)
          </li>
          <li>Creating variations of an existing image (DALL·E 2 only)</li>
        </ol>
      </div>
      <Tabs defaultValue="text" className="space-y-4 py-5">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="text">Text To Image</TabsTrigger>
          <TabsTrigger value="password">Edit Image</TabsTrigger>
          <TabsTrigger value="password">Variation</TabsTrigger>
          <TabsTrigger value="password">Vision</TabsTrigger>
        </TabsList>
        <TabsContent value="text">
          <TextToImage />
        </TabsContent>
        <TabsContent value="password">
          {/* <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card> */}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default CreatePost;
