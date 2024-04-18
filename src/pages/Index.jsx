import React, { useState } from "react";
import { Box, Heading, Input, Button, Text, VStack, HStack, useToast, Link } from "@chakra-ui/react";
import { FaLink, FaCopy } from "react-icons/fa";

const Index = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${encodeURIComponent(longUrl)}`);
      const data = await response.json();
      setShortUrl(data.result.full_short_link);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to shorten the URL.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    toast({
      title: "Copied",
      description: "Short URL copied to clipboard.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box maxWidth="600px" margin="auto" padding={8}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">
          URL Shortener
        </Heading>
        <form onSubmit={handleSubmit}>
          <HStack>
            <Input placeholder="Enter a long URL" value={longUrl} onChange={(e) => setLongUrl(e.target.value)} required />
            <Button type="submit" colorScheme="blue" leftIcon={<FaLink />}>
              Shorten
            </Button>
          </HStack>
        </form>
        {shortUrl && (
          <Box borderWidth={1} borderRadius="md" padding={4}>
            <Text>
              Short URL:{" "}
              <Link href={shortUrl} isExternal>
                {shortUrl}
              </Link>
            </Text>
            <Button size="sm" colorScheme="teal" leftIcon={<FaCopy />} onClick={handleCopy} mt={2}>
              Copy
            </Button>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default Index;
