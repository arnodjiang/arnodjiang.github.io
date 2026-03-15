import { VStack, Heading, Text, Box, Container } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { siteOwner, githubUsername } from '@/site.config'

const MotionBox = motion(Box)

const Contact = () => {
  return (
    <Container maxW="7xl" px={4}>
      <VStack spacing={8} align="stretch">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Heading as="h1" size="xl" mb={6}>Contact</Heading>
          <Box className="meta">
            <Box className="meta-item">
              <i className="fa-solid fa-clock"></i>
              Response time: 24-48h
            </Box>
          </Box>

          <Box as="pre" p={4} bg="var(--header-bg)" borderRadius="md" fontFamily="mono" mb={6}>
{`# Contact Information
EMAIL    = "${siteOwner.contact.email}"
LINKEDIN = "${siteOwner.social.linkedin}"
GITHUB   = "${siteOwner.social.github}"
LOCATION = "${siteOwner.contact.location}"`}
          </Box>

          <Box mt={8} p={6} borderRadius="md" bg="var(--card-bg)" borderWidth="1px" borderColor="var(--border-color)">
            <Heading as="h2" size="md" mb={4}>Quick Links</Heading>
            <VStack align="stretch" spacing={3}>
              <Box>
                <Text as="span" fontWeight="bold">Email:</Text>{" "}
                <a href={`mailto:${siteOwner.contact.email}`} style={{ color: 'var(--accent-color)' }}>
                  {siteOwner.contact.email}
                </a>
              </Box>
              <Box>
                <Text as="span" fontWeight="bold">LinkedIn:</Text>{" "}
                <a href={siteOwner.social.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-color)' }}>
                  @{siteOwner.social.linkedin.split('/').filter(Boolean).pop()}
                </a>
              </Box>
              <Box>
                <Text as="span" fontWeight="bold">GitHub:</Text>{" "}
                <a href={siteOwner.social.github} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-color)' }}>
                  @{githubUsername}
                </a>
              </Box>
              <Box>
                <Text as="span" fontWeight="bold">Medium:</Text>{" "}
                <a href={siteOwner.social.medium} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-color)' }}>
                  @{siteOwner.social.medium.split('@').pop()}
                </a>
              </Box>
              <Box>
                <Text as="span" fontWeight="bold">Google Scholar:</Text>{" "}
                <a href={siteOwner.social.googleScholar} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-color)' }}>
                  View Profile
                </a>
              </Box>
            </VStack>
          </Box>
        </MotionBox>
      </VStack>
    </Container>
  )
}

export default Contact
