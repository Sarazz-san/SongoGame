import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { StatusChip } from '../components/chips/StatusChip';
import { Text } from '../components/typography/Text';
import { colors } from '../theme/colors';
import { rounded, spacing } from '../theme/spacing';
import { RULES_FR } from '../content/rules.fr';
import { RuleCard } from '../components/RuleCard';

export function LearnScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text variant="header">Tutorial & Rules</Text>
      <Text variant="body">Maîtrisez le rythme mathématique du Songo.</Text>
      <View style={styles.chips}>
        <StatusChip label="Règles officielles (FR)" />
        <StatusChip label="Version Ekang" />
      </View>

      <View style={styles.stack}>
        {RULES_FR.map((section) => (
          <RuleCard
            key={section.key}
            title={section.title}
            subtitle={section.subtitle}
            bullets={section.bullets}
            note={section.note}
          />
        ))}
      </View>

      <View style={styles.footerCard}>
        <Text variant="body" color={colors.onSurface}>
          Astuce Grandmaster
        </Text>
        <Text variant="body">
          Le vainqueur est souvent celui qui contrôle le flux des semailles, pas celui qui capture le plus tôt.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.gutter,
    paddingTop: spacing.gutter,
    paddingBottom: spacing.gutter * 2,
    gap: spacing.unit * 2,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.unit,
  },
  stack: {
    gap: spacing.unit * 2,
  },
  footerCard: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: rounded.xl,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    padding: spacing.gutter,
  },
});
