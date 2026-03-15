import { Box, VStack, Heading, Text, useColorModeValue, Link, HStack, Container, Badge, Flex, Image, Collapse, useDisclosure, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { useMemo } from 'react'
import { research, experience, news, about, publications, institutionLogos } from '../data'
import { siteConfig, selectedPublicationIds } from '@/site.config'
import DynamicIcon from './DynamicIcon'

// Import sub-components
import HeroSection from './about/HeroSection'
import Footer from './about/Footer'
import NewsTimeline from './about/NewsTimeline'
import AccomplishmentsTerminal from './AccomplishmentsTerminal'

// Parse **bold** markers in text
const renderBoldText = (text: string, color: string, boldColor: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <Text as="span" key={i} fontWeight="semibold" color={boldColor}>{part.slice(2, -2)}</Text>
    }
    return <Text as="span" key={i} color={color}>{part}</Text>
  })
}

// Logo mappings derived from shared data layer
const researchLogos = institutionLogos
const universityLogos = institutionLogos


// Publication card component with its own state
const PubLink = ({ href, icon, label }: { href: string; icon: string; label: string }) => (
  <Link href={href} isExternal _hover={{ textDecoration: 'none' }}>
    <HStack
      spacing={1.5}
      px={2.5}
      py={1}
      borderRadius="sm"
      border="1px solid"
      borderColor={useColorModeValue('gray.200', 'gray.600')}
      color={useColorModeValue('gray.600', 'gray.400')}
      fontSize="xs"
      fontFamily="mono"
      transition="all 0.15s"
      _hover={{ borderColor: 'cyan.400', color: 'cyan.400', bg: useColorModeValue('gray.50', 'whiteAlpha.50') }}
    >
      <DynamicIcon name={icon} boxSize={3} />
      <Text>{label}</Text>
    </HStack>
  </Link>
);

const PublicationCard = ({ pub }: { pub: any }) => {
  const { isOpen: isAbstractOpen, onToggle: onToggleAbstract } = useDisclosure();
  const { isOpen: isImageOpen, onOpen: onImageOpen, onClose: onImageClose } = useDisclosure();
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      p={[4, 5, 6]}
      bg={useColorModeValue('white', 'gray.800')}
      borderRadius="md"
      border="1px solid"
      borderColor={borderColor}
      transition="all 0.2s"
      _hover={{ borderColor: useColorModeValue('cyan.300', 'cyan.600') }}
    >
      <Flex
        direction={["column", "column", "row"]}
        gap={[4, 4, 6]}
        align="stretch"
      >
        {/* Featured Image */}
        {pub.featuredImage && (
          <Box
            flexShrink={0}
            w={["full", "full", "300px"]}
            minH={["200px", "220px", "auto"]}
            role="button"
            tabIndex={0}
            onClick={onImageOpen}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                onImageOpen()
              }
            }}
            cursor="zoom-in"
            overflow="hidden"
            borderRadius="sm"
          >
            <Image
              src={pub.featuredImage}
              alt={pub.title}
              w="full"
              h="full"
              objectFit="contain"
              bg={useColorModeValue('gray.50', 'gray.900')}
              p={1}
              transition="transform 0.3s"
              _hover={{ transform: 'scale(1.03)' }}
            />
          </Box>
        )}

        {/* Publication Details */}
        <VStack align="start" spacing={2.5} flex={1} justify="center">
          {/* Venue line */}
          {/* Venue */}
          <HStack spacing={2} flexWrap="wrap" align="center">
            <Box h="2px" w="16px" bg="cyan.400" borderRadius="full" />
            <Text fontSize="xs" fontFamily="mono" color="cyan.400" fontWeight="semibold" letterSpacing="wide" textTransform="uppercase">
              {pub.venue && String(pub.year) && pub.venue.includes(String(pub.year))
                ? pub.venue
                : `${pub.venue} ${pub.year}`}
            </Text>
            {pub.venueType && (
              <Text fontSize="2xs" color={useColorModeValue('gray.400', 'gray.500')} fontFamily="mono">
                / {pub.venueType}
              </Text>
            )}
          </HStack>

          {/* Title */}
          <Heading size="sm" lineHeight="tall" fontWeight="semibold" color={useColorModeValue('gray.800', 'gray.100')}>
            {pub.title}
          </Heading>

          {/* Authors + Role Badges */}
          <VStack align="start" spacing={1.5} w="full">
            <Text fontSize="xs" color={useColorModeValue('gray.500', 'gray.400')} lineHeight="base" noOfLines={2}>
              {pub.authors.map((author: string, idx: number) => {
                const isHighlighted = pub.isCoFirst && pub.coFirstAuthors?.includes(author)
                return (
                  <Text
                    as="span"
                    key={idx}
                    fontWeight={isHighlighted ? 'semibold' : 'normal'}
                    color={isHighlighted ? useColorModeValue('gray.700', 'gray.200') : undefined}
                  >
                    {author}
                    {isHighlighted && <Text as="sup" fontSize="2xs" color="cyan.400">*</Text>}
                    {idx < pub.authors.length - 1 && ', '}
                  </Text>
                )
              })}
            </Text>
            {pub.specialBadges && pub.specialBadges.length > 0 && (
              <HStack spacing={1.5} flexWrap="wrap">
                {pub.specialBadges.map((badge: string) => (
                  <Text
                    key={badge}
                    fontSize="2xs"
                    fontFamily="mono"
                    px={2}
                    py={0.5}
                    borderRadius="sm"
                    border="1px solid"
                    borderColor={
                      badge === 'First Author' || badge === 'Co-First'
                        ? useColorModeValue('cyan.200', 'cyan.700')
                        : badge === 'Oral' || badge === 'Spotlight' || badge === 'Best Paper'
                        ? useColorModeValue('orange.200', 'orange.700')
                        : useColorModeValue('gray.200', 'gray.600')
                    }
                    color={
                      badge === 'First Author' || badge === 'Co-First'
                        ? useColorModeValue('cyan.600', 'cyan.300')
                        : badge === 'Oral' || badge === 'Spotlight' || badge === 'Best Paper'
                        ? useColorModeValue('orange.600', 'orange.300')
                        : useColorModeValue('gray.500', 'gray.400')
                    }
                    bg={
                      badge === 'First Author' || badge === 'Co-First'
                        ? useColorModeValue('cyan.50', 'whiteAlpha.50')
                        : badge === 'Oral' || badge === 'Spotlight' || badge === 'Best Paper'
                        ? useColorModeValue('orange.50', 'whiteAlpha.50')
                        : 'transparent'
                    }
                  >
                    {badge}
                  </Text>
                ))}
                {pub.isCoFirst && (
                  <Text fontSize="2xs" color={useColorModeValue('gray.400', 'gray.500')} fontStyle="italic">
                    * equal contribution
                  </Text>
                )}
              </HStack>
            )}
          </VStack>

          {/* Divider */}
          <Box w="full" h="1px" bg={useColorModeValue('gray.100', 'gray.700')} />

          {/* Links */}
          <HStack spacing={1.5} flexWrap="wrap">
            {pub.links.paper && <PubLink href={pub.links.paper} icon="FaFileAlt" label="Paper" />}
            {pub.links.arxiv && <PubLink href={pub.links.arxiv} icon="SiArxiv" label="arXiv" />}
            {pub.links.projectPage && <PubLink href={pub.links.projectPage} icon="FaGlobe" label="Project" />}
            {pub.links.code && <PubLink href={pub.links.code} icon="FaGithub" label="Code" />}
            {pub.links.demo && <PubLink href={pub.links.demo} icon="FaPlay" label="Demo" />}
            {pub.links.dataset && <PubLink href={pub.links.dataset} icon="FaDatabase" label="Dataset" />}
            {pub.abstract && (
              <HStack
                as="button"
                spacing={1.5}
                px={2.5}
                py={1}
                borderRadius="sm"
                border="1px solid"
                borderColor={isAbstractOpen ? useColorModeValue('cyan.300', 'cyan.600') : borderColor}
                color={isAbstractOpen ? 'cyan.400' : useColorModeValue('gray.600', 'gray.400')}
                fontSize="xs"
                fontFamily="mono"
                transition="all 0.15s"
                _hover={{ borderColor: 'cyan.400', color: 'cyan.400' }}
                onClick={onToggleAbstract}
              >
                <DynamicIcon name="FaChevronRight" boxSize={2.5} style={{ transform: isAbstractOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.15s' }} />
                <Text>Abstract</Text>
              </HStack>
            )}
          </HStack>
        </VStack>
      </Flex>

      {/* Abstract - full width below */}
      {pub.abstract && (
        <Collapse in={isAbstractOpen} animateOpacity>
          <Box
            mt={4}
            p={4}
            bg={useColorModeValue('gray.50', 'gray.900')}
            borderRadius="md"
            borderLeft="2px solid"
            borderLeftColor="cyan.400"
          >
            <Text fontSize={["xs", "sm"]} lineHeight="tall" color={useColorModeValue('gray.600', 'gray.400')}>
              {pub.abstract}
            </Text>
            {pub.keywords && (
              <HStack mt={3} spacing={1.5} flexWrap="wrap">
                {pub.keywords.map((keyword: string) => (
                  <Text
                    key={keyword}
                    fontSize="2xs"
                    fontFamily="mono"
                    color={useColorModeValue('gray.500', 'gray.500')}
                    px={1.5}
                    py={0.5}
                    bg={useColorModeValue('gray.100', 'gray.800')}
                    borderRadius="sm"
                  >
                    {keyword}
                  </Text>
                ))}
              </HStack>
            )}
          </Box>
        </Collapse>
      )}

      <Modal isOpen={isImageOpen} onClose={onImageClose} size="4xl" isCentered>
        <ModalOverlay />
        <ModalContent bg="transparent" boxShadow="none">
          <ModalCloseButton color={useColorModeValue('gray.700', 'gray.200')} />
          <ModalBody p={0} display="flex" alignItems="center" justifyContent="center">
            <Image
              src={pub.featuredImage}
              alt={`${pub.title} large preview`}
              maxH="80vh"
              maxW="90vw"
              objectFit="contain"
              borderRadius="lg"
              bg={useColorModeValue('white', 'gray.900')}
              p={4}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default function About() {
  // Sort news items by date (newest first)
  const sortedNews = useMemo(() => {
    return [...news].sort((a, b) => {
      if (!a.sortDate && !b.sortDate) return 0;
      if (!a.sortDate) return 1;
      if (!b.sortDate) return -1;
      return b.sortDate.localeCompare(a.sortDate);
    });
  }, [news]);

  const selectedPublications = useMemo(
    () => publications.filter((pub) => selectedPublicationIds.has(pub.id)),
    []
  );

  return (
    <Box w="full">
      <VStack spacing={0} align="stretch" w="full">
        <HeroSection
          title={siteConfig.title}
          avatar={siteConfig.avatar}
          research={research.currentResearch}
          researchLogos={researchLogos}
          education={experience.education.courses}
          educationLogos={universityLogos}
        />
        
        <Box w="full" py={[2, 2, 3]}>
          <Container maxW={["full", "full", "7xl"]} px={[2, 4, 8]}>
            <VStack spacing={[2, 3, 4]} align="stretch">
              {/* News Section */}
              <Box w="full">
                <Flex align="center" gap={3} mb={4}>
                  <Box h="2px" w="20px" bg="cyan.400" borderRadius="full" flexShrink={0} />
                  <Heading size="md" fontWeight="semibold">Recent Updates</Heading>
                  <Badge colorScheme="green" variant="subtle" fontSize="2xs" fontFamily="mono">News</Badge>
                  <Box flex="1" h="1px" bg={useColorModeValue('gray.200', 'gray.700')} />
                </Flex>

                <NewsTimeline news={sortedNews} showHeader={false} />
              </Box>

              {/* Main Content Sections */}
              <VStack spacing={[6, 8, 10]} align="stretch" mt={[4, 6, 8]}>
                {/* Publications Section */}
                <Box w="full">
                  <Flex align="center" gap={3} mb={[3, 4]}>
                    <Box h="2px" w="20px" bg="cyan.400" borderRadius="full" flexShrink={0} />
                    <Heading size="md" fontWeight="semibold">Selected Publications</Heading>
                    <Box flex="1" h="1px" bg={useColorModeValue('gray.200', 'gray.700')} />
                  </Flex>
                  
                  <VStack spacing={[4, 5, 6]} align="stretch">
                    {selectedPublications.map((pub) => (
                      <PublicationCard key={pub.id} pub={pub} />
                    ))}
                    <Box textAlign="center" pt={2}>
                      <Link href="/publications" _hover={{ textDecoration: 'none' }}>
                        <HStack
                          spacing={2}
                          justify="center"
                          color={useColorModeValue('gray.500', 'gray.400')}
                          fontSize="sm"
                          fontFamily="mono"
                          transition="all 0.15s"
                          _hover={{ color: 'cyan.400' }}
                        >
                          <Text>View all publications</Text>
                          <Text>→</Text>
                        </HStack>
                      </Link>
                    </Box>
                  </VStack>
                </Box>

                {/* About Section */}
                <Box w="full">

                  <VStack spacing={[4, 5, 6]} align="start" w="full">
                    <Flex align="center" gap={3} w="full">
                      <Box h="2px" w="20px" bg="cyan.400" borderRadius="full" flexShrink={0} />
                      <Heading size={["sm", "md"]} fontWeight="semibold">My Journey</Heading>
                      <Box flex="1" h="1px" bg={useColorModeValue('gray.200', 'gray.700')} />
                    </Flex>

                    {/* Timeline */}
                    {about.journeyPhases && (
                      <Box w="full" position="relative">
                        {/* Vertical line */}
                        <Box
                          position="absolute"
                          left={["7px", "7px", "7px"]}
                          top="12px"
                          bottom="12px"
                          w="1px"
                          bg={useColorModeValue('gray.200', 'gray.700')}
                        />

                        <VStack spacing={0} align="stretch">
                          {about.journeyPhases.map((phase, index) => (
                            <Flex key={index} gap={[3, 4]} align="start" py={3} position="relative">
                              {/* Dot */}
                              <Box flexShrink={0} mt="6px">
                                <Box
                                  w="14px"
                                  h="14px"
                                  borderRadius="full"
                                  border="2px solid"
                                  borderColor={index === about.journeyPhases!.length - 1 ? 'cyan.400' : useColorModeValue('gray.300', 'gray.600')}
                                  bg={index === about.journeyPhases!.length - 1 ? 'cyan.400' : useColorModeValue('white', 'gray.800')}
                                />
                              </Box>

                              {/* Content */}
                              <Box flex={1} pb={2}>
                                <HStack spacing={2} mb={1} flexWrap="wrap">
                                  <Text fontSize="2xs" fontFamily="mono" color="cyan.400" fontWeight="semibold" textTransform="uppercase" letterSpacing="wide">
                                    {phase.period}
                                  </Text>
                                  <Text fontSize="2xs" color={useColorModeValue('gray.400', 'gray.600')}>
                                    /
                                  </Text>
                                  <Text fontSize="2xs" fontFamily="mono" color={useColorModeValue('gray.400', 'gray.500')}>
                                    {phase.org}
                                  </Text>
                                </HStack>

                                <Text fontSize="sm" fontWeight="semibold" color={useColorModeValue('gray.800', 'gray.100')} mb={1}>
                                  {phase.title}
                                </Text>

                                <Text fontSize="xs" lineHeight="tall" mb={2}>
                                  {renderBoldText(phase.description, useColorModeValue('gray.500', 'gray.400'), useColorModeValue('gray.700', 'gray.200'))}
                                </Text>

                                {phase.tags && (
                                  <HStack spacing={1.5} flexWrap="wrap">
                                    {phase.tags.map((tag) => (
                                      <Text
                                        key={tag}
                                        fontSize="2xs"
                                        fontFamily="mono"
                                        color={useColorModeValue('gray.500', 'gray.500')}
                                        px={1.5}
                                        py={0.5}
                                        bg={useColorModeValue('gray.100', 'gray.800')}
                                        borderRadius="sm"
                                      >
                                        {tag}
                                      </Text>
                                    ))}
                                  </HStack>
                                )}
                              </Box>
                            </Flex>
                          ))}
                          {/* View all — as last timeline node */}
                          <Flex gap={[3, 4]} align="start" py={3} position="relative">
                            <Box flexShrink={0} mt="6px">
                              <Box
                                w="14px"
                                h="14px"
                                borderRadius="full"
                                border="2px dashed"
                                borderColor={useColorModeValue('gray.300', 'gray.600')}
                              />
                            </Box>
                            <Link href="/experience" _hover={{ textDecoration: 'none' }}>
                              <HStack
                                spacing={2}
                                color={useColorModeValue('gray.400', 'gray.500')}
                                fontSize="xs"
                                fontFamily="mono"
                                transition="all 0.15s"
                                _hover={{ color: 'cyan.400' }}
                                mt="3px"
                              >
                                <Text>View all experience</Text>
                                <Text>→</Text>
                              </HStack>
                            </Link>
                          </Flex>
                        </VStack>
                      </Box>
                    )}
                    {about.mentorship && (
                      <Box w="full">
                        <Flex align="center" gap={3} mb={3}>
                          <Box h="2px" w="20px" bg="cyan.400" borderRadius="full" flexShrink={0} />
                          <Heading size={["sm", "md"]} fontWeight="semibold">{about.mentorship.heading}</Heading>
                          <Box flex="1" h="1px" bg={useColorModeValue('gray.200', 'gray.700')} />
                        </Flex>
                        {about.mentorship.description && (
                          <Text fontSize="xs" lineHeight="tall" color={useColorModeValue('gray.500', 'gray.400')} mb={4}>
                            {about.mentorship.description}
                          </Text>
                        )}
                        <VStack spacing={0} align="stretch">
                          {about.mentorship.mentees.map((mentee, index) => (
                            <Flex
                              key={index}
                              align="center"
                              gap={3}
                              py={2.5}
                              borderBottom="1px solid"
                              borderColor={useColorModeValue('gray.100', 'gray.800')}
                            >
                              <Box w="6px" h="6px" borderRadius="full" bg="cyan.400" flexShrink={0} />
                              <Link href={mentee.url} isExternal _hover={{ textDecoration: 'none' }}>
                                <Text fontSize="sm" fontWeight="medium"
                                  color={useColorModeValue('gray.700', 'gray.200')}
                                  transition="color 0.15s" _hover={{ color: 'cyan.400' }}>
                                  {mentee.name}
                                </Text>
                              </Link>
                              {mentee.note && (
                                <Text fontSize="2xs" fontFamily="mono" color={useColorModeValue('gray.400', 'gray.500')}>
                                  {mentee.note}
                                </Text>
                              )}
                            </Flex>
                          ))}
                        </VStack>
                      </Box>
                    )}
                  </VStack>
                </Box>
              </VStack>
            </VStack>
          </Container>
        </Box>

        {/* Accomplishments - terminal style */}
        <Box w="full" mt={[4, 6, 10]}>
          
          <AccomplishmentsTerminal />
        </Box>
        <Footer />
      </VStack>
    </Box>
  )
} 
