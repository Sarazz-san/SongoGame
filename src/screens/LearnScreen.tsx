import React from 'react';
import { ScrollView, StyleSheet, View, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Text } from '../components/typography/Text';
import { colors } from '../theme/colors';
import { rounded, spacing } from '../theme/spacing';
import { TopAppBar } from '../components/TopAppBar';
import { typography } from '../theme/typography';

export function LearnScreen() {
  return (
    <View style={styles.screen}>
      <TopAppBar variant="learn" />
      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Intro Header */}
        <View style={styles.introHeader}>
          <Text style={styles.title}>Tutoriel & Règles</Text>
          <Text style={styles.subtitle}>Maîtrisez le rythme mathématique ancestral du Songo.</Text>
        </View>

        {/* Section 1: Le Relais */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.iconBox}>
              <MaterialIcons name="autorenew" size={24} color={colors.tacticalGold} />
            </View>
            <View>
              <Text style={styles.sectionTitle}>Le Relais</Text>
              <Text style={styles.sectionLabel}>MÉCANIQUE DE DÉPLACEMENT</Text>
            </View>
          </View>

          <Text style={styles.paragraph}>
            Le cœur de la stratégie du Songo. Lors de vos semailles, si votre dernière graine tombe dans une case qui <Text style={styles.highlightBold}>contient déjà des graines</Text>, vous ne vous arrêtez pas.
          </Text>

          <View style={styles.bulletList}>
            <View style={styles.bulletItem}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>Vous ramassez toutes les graines de cette case (y compris celle que vous venez de déposer).</Text>
            </View>
            <View style={styles.bulletItem}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>Vous continuez de semer dans la même direction.</Text>
            </View>
            <View style={styles.bulletItem}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>Enchaînez plusieurs relais pour traverser le plateau en un seul tour.</Text>
            </View>
          </View>

          {/* Diagram Shell */}
          <View style={styles.diagramShell}>
            <View style={styles.diagramRow}>
              {/* Pit A */}
              <View style={styles.pitA}>
                <Text style={styles.pitLabel}>CASE A</Text>
                <View style={[styles.seed, { top: 16, left: 16 }]} />
                <View style={[styles.seed, { bottom: 16, right: 20 }]} />
                <View style={[styles.seed, { top: 24, right: 12 }]} />
              </View>

              <MaterialIcons name="arrow-right-alt" size={32} color={colors.tacticalGold} style={styles.diagramArrow} />

              {/* Relay Point */}
              <View style={styles.pitRelay}>
                <Text style={styles.pitLabelGold}>POINT DE RELAIS</Text>
                <View style={[styles.seed, { top: 24, left: 24 }]} />
                <View style={[styles.seed, { top: 16, right: 32 }]} />
                {/* +1 Seed Badge */}
                <View style={styles.plusOneBadge}>
                  <Text style={styles.plusOneText}>+1 Graine</Text>
                </View>
              </View>
            </View>
            <Text style={styles.diagramCaption}>
              Tomber sur une case non vide déclenche une collecte immédiate et le tour continue.
            </Text>
          </View>
        </View>

        {/* Section 2: Capture Rules */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.iconBox}>
              <MaterialIcons name="toll" size={24} color={colors.tacticalGold} />
            </View>
            <View>
              <Text style={styles.sectionTitle}>La Capture</Text>
              <Text style={styles.sectionLabel}>RÈGLE DE SCORE</Text>
            </View>
          </View>

          <Text style={styles.paragraph}>
            La capture a lieu lorsque votre semaille se termine dans <Text style={styles.highlightBoldSecondary}>le camp adverse</Text>, dans une case contenant :
          </Text>

          <View style={styles.captureGrid}>
            <View style={styles.captureBox}>
              <Text style={styles.captureNum}>2</Text>
              <Text style={styles.captureLabel}>GRAINES</Text>
            </View>
            <View style={styles.captureBox}>
              <Text style={styles.captureNum}>3</Text>
              <Text style={styles.captureLabel}>GRAINES</Text>
            </View>
            <View style={styles.captureBox}>
              <Text style={styles.captureNum}>4</Text>
              <Text style={styles.captureLabel}>GRAINES</Text>
            </View>
          </View>

          <View style={styles.quoteBox}>
            <Text style={styles.quoteText}>
              "Si la case d'arrivée contient 2, 3 ou 4 graines, vous les capturez. Vous capturez également les graines des cases précédentes si elles contiennent aussi 2, 3 ou 4 graines en une séquence ininterrompue."
            </Text>
          </View>
        </View>

        {/* Section 3: L'Ethique (Grand Slam) */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.iconBox}>
              <MaterialIcons name="gavel" size={24} color={colors.tacticalGold} />
            </View>
            <View>
              <Text style={styles.sectionTitle}>L'Éthique</Text>
              <Text style={styles.sectionLabel}>RÈGLE DE SOLIDARITÉ</Text>
            </View>
          </View>

          <Text style={styles.paragraph}>
            Le Songo est un jeu d'équilibre stratégique, pas d'extermination.
          </Text>

          <View style={styles.ethicsList}>
            <View style={styles.ethicsItem}>
              <MaterialIcons name="block" size={24} color={colors.error} style={styles.ethicsIcon} />
              <View style={styles.ethicsTextCol}>
                <Text style={styles.ethicsTitle}>Ne jamais "affamer" l'adversaire</Text>
                <Text style={styles.ethicsDesc}>Il est interdit de jouer un coup qui laisse l'adversaire avec zéro graine dans son camp (si un autre coup est possible).</Text>
              </View>
            </View>

            <View style={styles.ethicsItem}>
              <MaterialIcons name="info" size={24} color={colors.sunsetGlow} style={styles.ethicsIcon} />
              <View style={styles.ethicsTextCol}>
                <Text style={styles.ethicsTitle}>L'obligation de nourrir</Text>
                <Text style={styles.ethicsDesc}>Si l'adversaire n'a plus de graines, vous DEVEZ jouer un coup qui amène des graines dans son territoire si un tel coup est possible.</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Strategy Tip */}
        <View style={styles.tipCard}>
          <View style={styles.tipImageWrap}>
            <Image
              source={require('../assets/images/songo-card.png')}
              style={styles.tipImage}
              resizeMode="cover"
            />
          </View>
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Astuce Grandmaster</Text>
            <Text style={styles.tipParagraph}>
              "Au Songo, le gagnant n'est souvent pas celui qui capture le plus de graines tôt dans la partie, mais celui qui gère le flux des relais pour contrôler le plateau. Gardez vos cases 'fertiles' avec 1 ou 2 graines pour maximiser votre potentiel de relais."
            </Text>
            <View style={styles.proverbRow}>
              <View style={styles.proverbLine} />
              <Text style={styles.proverbText}>Proverbe Ancestral Songo</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.gutter,
    paddingTop: spacing.gutter * 2,
    paddingBottom: spacing.gutter * 3,
    gap: spacing.gutter,
  },
  introHeader: {
    alignItems: 'center',
    marginBottom: spacing.gutter,
  },
  title: {
    ...typography.headlineLg,
    color: colors.tacticalGold,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    maxWidth: 300,
  },
  sectionCard: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: rounded.xl,
    borderWidth: 1,
    borderColor: colors.mahoganyRich,
    padding: spacing.gutter,
    shadowColor: colors.mahoganyRich,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: spacing.gutter,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  iconBox: {
    backgroundColor: colors.mahoganyRich,
    padding: 10,
    borderRadius: rounded.lg,
  },
  sectionTitle: {
    ...typography.headlineLgMobile,
    color: colors.tacticalGold,
  },
  sectionLabel: {
    ...typography.labelTechnical,
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontSize: 10,
  },
  paragraph: {
    ...typography.bodyMd,
    color: colors.onSurface,
    marginBottom: 16,
    lineHeight: 22,
  },
  highlightBold: {
    color: colors.tacticalGold,
    fontWeight: 'bold',
  },
  highlightBoldSecondary: {
    color: colors.secondary,
    fontWeight: 'bold',
  },
  bulletList: {
    gap: 8,
    marginBottom: 20,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  bulletDot: {
    color: colors.tacticalGold,
    fontSize: 16,
    lineHeight: 20,
  },
  bulletText: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    flex: 1,
    lineHeight: 22,
  },
  diagramShell: {
    backgroundColor: colors.ebonyDeep,
    padding: 16,
    borderRadius: rounded.xl,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    alignItems: 'center',
  },
  diagramRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    height: 120,
    marginBottom: 16,
  },
  pitA: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.mahoganyRich,
    position: 'relative',
  },
  pitLabel: {
    position: 'absolute',
    top: -24,
    left: 0,
    right: 0,
    textAlign: 'center',
    ...typography.labelTechnical,
    color: colors.onSurfaceVariant,
    fontSize: 10,
  },
  seed: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F0EBE6',
  },
  diagramArrow: {
    opacity: 0.8,
  },
  pitRelay: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.tacticalGold,
    position: 'relative',
    shadowColor: colors.tacticalGold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  pitLabelGold: {
    position: 'absolute',
    top: -24,
    left: -20,
    right: -20,
    textAlign: 'center',
    ...typography.labelTechnical,
    color: colors.tacticalGold,
    fontSize: 10,
  },
  plusOneBadge: {
    position: 'absolute',
    top: -16,
    right: -16,
    backgroundColor: colors.mahoganyRich,
    borderWidth: 1,
    borderColor: colors.tacticalGold,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: rounded.sm,
    zIndex: 10,
  },
  plusOneText: {
    ...typography.labelTechnical,
    color: colors.tacticalGold,
    fontSize: 10,
  },
  diagramCaption: {
    ...typography.labelTechnical,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  captureGrid: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  captureBox: {
    flex: 1,
    backgroundColor: colors.ebonyDeep,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    padding: 12,
    borderRadius: rounded.lg,
    alignItems: 'center',
  },
  captureNum: {
    ...typography.statsDisplay,
    color: colors.tacticalGold,
    fontSize: 24,
    lineHeight: 28,
  },
  captureLabel: {
    ...typography.labelTechnical,
    color: colors.onSurfaceVariant,
    fontSize: 10,
    textTransform: 'uppercase',
  },
  quoteBox: {
    backgroundColor: 'rgba(61, 36, 36, 0.3)',
    padding: 16,
    borderRadius: rounded.lg,
    borderLeftWidth: 4,
    borderLeftColor: colors.tacticalGold,
  },
  quoteText: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    fontStyle: 'italic',
    lineHeight: 22,
  },
  ethicsList: {
    gap: 16,
  },
  ethicsItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  ethicsIcon: {
    marginTop: 2,
  },
  ethicsTextCol: {
    flex: 1,
  },
  ethicsTitle: {
    ...typography.labelTechnical,
    color: colors.tacticalGold,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  ethicsDesc: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    fontSize: 14,
    lineHeight: 20,
  },
  tipCard: {
    backgroundColor: colors.ebonyDeep,
    borderWidth: 2,
    borderColor: colors.mahoganyRich,
    borderRadius: rounded.xl,
    overflow: 'hidden',
    marginTop: spacing.gutter,
  },
  tipImageWrap: {
    width: '100%',
    height: 180,
    backgroundColor: colors.surfaceContainer,
  },
  tipImage: {
    width: '100%',
    height: '100%',
    opacity: 0.6,
  },
  tipContent: {
    padding: spacing.gutter,
  },
  tipTitle: {
    ...typography.headlineLgMobile,
    color: colors.tacticalGold,
    marginBottom: 8,
  },
  tipParagraph: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    marginBottom: 16,
    lineHeight: 22,
  },
  proverbRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  proverbLine: {
    height: 4,
    width: 48,
    backgroundColor: colors.tacticalGold,
    borderRadius: 2,
  },
  proverbText: {
    ...typography.labelTechnical,
    color: colors.tacticalGold,
    textTransform: 'uppercase',
    letterSpacing: -0.5,
  },
});
